import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.OrderCreateInput) {
    return this.prismaService.order.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.order.findMany();
  }

  async findOneById(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with id: ${id} does not exist`);
    }
    return order;
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return this.prismaService.order.update({
      data,
      where: { id },
    });
  }

  async findAllByCustomerId(customerId: string) {
    const orders = await this.prismaService.order.findMany({
      where: { customerId },
    });
    if (!orders) {
      throw new Error(`Orders with customerId: ${customerId} do not exist`);
    }
    return orders;
  }
}
