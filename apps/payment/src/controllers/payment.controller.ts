import { Request, Response } from "express";
import Stripe from "stripe";
import {
  createCheckoutSession,
  getWebhookEvent,
  parseMetadata,
} from "services/payment.service";
import amqp from "lib/amqp";
import { Queue } from "@shifter-shop/amqp";

export const checkoutSession = async (req: Request, res: Response) => {
  const session = await createCheckoutSession("");
  return res.status(200).json({ url: session.url });
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
        console.log("Checkout session completed !", metadata);

        amqp.publish(Queue.PaymentSuccess, { ...metadata });
        break;
      }
    }
  } catch (err) {
    console.log((err as Error).message);
  }

  return res.status(200).json({ received: true });
};
