import {
  Controller,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { MailerService } from '../mailer/mailer.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private mailerService: MailerService,
  ) {}

  @Post('checkout')
  @HttpCode(200)
  async getCheckoutSession() {
    const session = await this.stripeService.createCheckoutSession(0);

    return { url: session.url };
  }

  @Post('webhook')
  async webhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      if (!signature) {
        throw new Error('No stripe signature');
      }

      const event = await this.stripeService.getWebhookEvent(
        request.rawBody!,
        signature,
      );

      switch (event.type) {
        /*
        case 'charge.succeeded':
        case 'payment_intent.created':
        case 'payment_intent.succeeded':
        case 'payment_intent.payment_failed':
        case 'checkout.session.async_payment_succeeded':
        case 'checkout.session.async_payment_failed'
        */
        case 'checkout.session.completed': {
          const eventData = event.data.object as Stripe.Checkout.Session;
          const metadata = this.stripeService.parseMetadata(eventData.metadata);

          const order = await this.stripeService.createOrder(
            metadata.customer,
            eventData.id,
          );

          await this.mailerService.sendOrderConfirmation(order);

          console.log('Order created !', metadata);
          break;
        }
      }
    } catch (err) {
      console.log((err as Error).message);
    }

    return { received: true };
  }
}
