import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ProductWithQuantity } from './interfaces/stripe.interface';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(private configService: ConfigService) {
    const secret = this.configService.getOrThrow<string>('stripe.secretKey');
    this.stripe = new Stripe(secret, {
      apiVersion: '2022-11-15',
      typescript: true,
    });
  }

  async createCheckoutSession(products: ProductWithQuantity[]) {
    const host = this.configService.getOrThrow<string>('clientHost');

    return this.stripe.checkout.sessions.create({
      line_items: this.getCheckoutItems(products),
      currency: 'eur',
      mode: 'payment',
      success_url: `${host}/checkout/success`,
      cancel_url: `${host}/cart`,
    });
  }

  async getWebhookEvent(request: RawBodyRequest<Request>) {
    const secret = this.configService.getOrThrow<string>(
      'stripe.signingSecret',
    );
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      throw new Error('No signature');
    }

    return this.stripe.webhooks.constructEventAsync(
      request.rawBody!,
      signature,
      secret,
    );
  }

  private getCheckoutItems(
    products: ProductWithQuantity[],
  ): Stripe.Checkout.SessionCreateParams.LineItem[] {
    return products.map((product) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          metadata: { id: product.id },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));
  }
}
