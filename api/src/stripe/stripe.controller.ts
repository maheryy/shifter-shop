import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ProductWithQuantity } from './interfaces/stripe.interface';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async getCheckoutSession() {
    // TODO: Get products from cart
    const products: ProductWithQuantity[] = [
      { id: 1, name: 'Shifter', price: 100, quantity: 1 },
      { id: 2, name: 'Turbo', price: 169, quantity: 3 },
    ];

    const session = await this.stripeService.createCheckoutSession(products);

    return { url: session.url };
  }

  @Post('webhook')
  async webhook(@Req() request: RawBodyRequest<Request>) {
    try {
      const event = await this.stripeService.getWebhookEvent(request);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const connectedAccountId = event.account;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }

    return { received: true };
  }
}
