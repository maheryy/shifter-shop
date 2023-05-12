import { Prisma } from '@prisma/client';

export type FullOrder = Prisma.OrderGetPayload<{
  include: {
    products: {
      include: {
        product: true;
      };
    };
    customer: { include: { profile: true } };
    payment: true;
  };
}>;

export interface StripeMetadata {
  customer: string;
  products: string[];
}
