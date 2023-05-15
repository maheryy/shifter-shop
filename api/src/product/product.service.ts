import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOneById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} does not exist`);
    }
    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prismaService.product.update({
      data,
      where: { id },
    });
  }

  async findAllByCategoryId(categoryId: string) {
    const products = await this.prismaService.product.findMany({
      where: { categoryId },
    });
    if (!products) {
      throw new NotFoundException(
        `Products with categoryId: ${categoryId} does not exist`,
      );
    }
    return products;
  }

  async findAllBySellerId(sellerId: string) {
    const products = await this.prismaService.product.findMany({
      where: { sellerId },
    });
    if (!products) {
      throw new NotFoundException(
        `Products with sellerId: ${sellerId} does not exist`,
      );
    }
    return products;
  }
}
