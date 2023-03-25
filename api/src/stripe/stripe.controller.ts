import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async getCheckoutSession() {
    const userId = 111;
    const session = await this.stripeService.createCheckoutSession(userId);

    return { url: session.url };
  }

  @Post('webhook')
  async webhook(@Req() request: RawBodyRequest<Request>) {
    try {
      const event = await this.stripeService.getWebhookEvent(request);

      switch (event.type) {
        // case 'charge.succeeded':
        // case 'payment_intent.created':
        // case 'payment_intent.succeeded':
        // case 'payment_intent.payment_failed':
        // case 'checkout.session.async_payment_succeeded':
        // case 'checkout.session.async_payment_failed'
        case 'checkout.session.completed': {
          const eventData = event.data.object as Stripe.Checkout.Session;
          const metadata = this.stripeService.parseMetadata(eventData.metadata);

          this.stripeService.createOrder(metadata.customer, eventData.id);
          break;
        }
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }

    return { received: true };
  }
}
