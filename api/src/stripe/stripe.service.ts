import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PaymentStatus, Product } from '@prisma/client';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FullOrder,
  StripeMetadata,
} from 'src/stripe/interfaces/stripe.interface';
import { ProductWithQuantity } from 'src/common/interfaces/product';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private helperService: HelperService,
  ) {
    const secret = this.configService.getOrThrow<string>('stripe.secretKey');
    this.stripe = new Stripe(secret, {
      apiVersion: '2022-11-15',
      typescript: true,
    });
  }

  async createCheckoutSession(userId: number) {
    const clientUrl = this.configService.getOrThrow<string>('clientUrl');

    /* temporary fetch random user that has cart products */
    const user = await this.prismaService.user.findFirst({
      where: { products: { some: { productId: { gt: 0 } } } },
    });
    userId = user?.id || 0;

    const customerProducts = await this.prismaService.customerProduct.findMany({
      where: { customerId: userId },
      include: { product: true },
    });

    if (customerProducts.length === 0) {
      throw new Error('No products in cart');
    }

    const products =
      this.helperService.getProductsWithQuantity(customerProducts);

    return this.stripe.checkout.sessions.create({
      line_items: this.getCheckoutItems(products),
      currency: 'eur',
      mode: 'payment',
      success_url: `${clientUrl}/checkout/success`,
      cancel_url: `${clientUrl}/cart`,
      metadata: { data: this.generateMetadata(userId, products) },
    });
  }

  async createOrder(userId: number, sessionId: string): Promise<FullOrder> {
    const customerProducts = await this.prismaService.customerProduct.findMany({
      where: { customerId: userId },
      include: { product: true },
    });

    const products =
      this.helperService.getProductsWithQuantity(customerProducts);

    if (products.length === 0) {
      throw new Error('No products in cart');
    }

    const reference = await this.helperService.generateOrderReference();
    const total = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    const [order] = await this.prismaService.$transaction([
      this.prismaService.order.create({
        data: {
          reference,
          total,
          customerId: userId,
          payment: {
            create: { id: sessionId, status: PaymentStatus.Confirmed },
          },
          products: {
            createMany: {
              data: products.map((product) => ({
                productId: product.id,
                quantity: product.quantity,
              })),
            },
          },
        },
        include: {
          customer: { include: { profile: true } },
          products: { include: { product: true } },
          payment: true,
        },
      }),
      this.prismaService.customerProduct.deleteMany({
        where: {
          customerId: userId,
          productId: { in: products.map((p) => p.id) },
        },
      }),
    ]);

    return order;
  }

  async getWebhookEvent(payload: Buffer | string, signature: string) {
    const secret = this.configService.getOrThrow<string>(
      'stripe.signingSecret',
    );

    return this.stripe.webhooks.constructEventAsync(payload, signature, secret);
  }

  parseMetadata(metadata: Stripe.Metadata | null): StripeMetadata {
    if (!metadata || !metadata.data) {
      throw new Error('No metadata');
    }
    return JSON.parse(metadata.data) as StripeMetadata;
  }

  private getCheckoutItems(
    products: ProductWithQuantity[],
  ): Stripe.Checkout.SessionCreateParams.LineItem[] {
    return products.map((product) => ({
      price_data: {
        currency: 'eur',
        unit_amount: product.price * 100,
        product_data: {
          name: product.name,
          metadata: { id: product.id },
        },
      },
      quantity: product.quantity,
    }));
  }

  private generateMetadata(customerId: number, products: Product[]): string {
    return JSON.stringify({
      customer: customerId,
      products: products.map((p) => p.id),
    } as StripeMetadata);
  }
}
