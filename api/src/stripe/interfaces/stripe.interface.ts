import { Prisma } from '@prisma/client';

export type OrderWithProducts = Prisma.OrderGetPayload<{
  include: {
    products: {
      include: {
        product: true;
      };
    };
  };
}>;

export interface StripeMetadata {
  customer: number;
  products: number[];
}
