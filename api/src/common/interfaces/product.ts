import { Prisma, Product } from '@prisma/client';

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export type CustomerProduct = Prisma.CustomerProductGetPayload<{
  include: {
    product: true;
  };
}>;
