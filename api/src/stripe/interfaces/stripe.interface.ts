import { Prisma } from '@prisma/client';

export type FullOrder = Prisma.OrderGetPayload<{
  include: {
    products: {
      include: {
        product: true;
      };
    };
    customer: true;
    payment: true;
  };
}>;

export interface StripeMetadata {
  customer: number;
  products: number[];
}
