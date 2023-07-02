import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import {
  createCheckoutSession,
  getWebhookEvent,
  parseMetadata,
} from "services/payment.service";
import amqp from "lib/amqp";
import { EExchange } from "@shifter-shop/amqp";
import { UnauthorizedError } from "@shifter-shop/errors";
import { logger } from "@shifter-shop/logger";

export const checkoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    if (!userId) {
      throw new UnauthorizedError();
    }

    const session = await createCheckoutSession(userId);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

export const webhook = async (req: Request, res: Response) => {
  try {
    const signature = req.header("stripe-signature");
    if (!signature) {
      throw new Error("No stripe signature");
    }

    const event = await getWebhookEvent(req.rawBody!, signature);

    switch (event.type) {
      /*
        case 'charge.succeeded':
        case 'payment_intent.created':
        case 'payment_intent.succeeded':
        case 'payment_intent.payment_failed':
        case 'checkout.session.async_payment_succeeded':
        case 'checkout.session.async_payment_failed'
        */
      case "checkout.session.completed": {
        const eventData = event.data.object as Stripe.Checkout.Session;
        const metadata = parseMetadata(eventData.metadata);

        amqp.publishToExchange(EExchange.PaymentSuccess, { ...metadata });
        break;
      }
    }
  } catch (err) {
    logger.error((err as Error).message);
  }

  return res.status(200).json({ received: true });
};
