import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import {
  CustomerProduct,
  ProductWithQuantity,
} from 'src/common/interfaces/product';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HelperService {
  constructor(private prismaService: PrismaService) {}

  generateReference(length: number) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length)
      .toUpperCase();
  }

  async generateOrderReference() {
    let reference: string;
    let order: Order | null;

    do {
      reference = this.generateReference(10);
      order = await this.prismaService.order.findUnique({
        where: { reference },
      });
    } while (order);

    return reference;
  }

  getProductsWithQuantity(products: CustomerProduct[]): ProductWithQuantity[] {
    return products.map(
      (item) =>
        ({ ...item.product, quantity: item.quantity } as ProductWithQuantity),
    );
  }
}
