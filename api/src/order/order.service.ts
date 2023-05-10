import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findOneById(id: number) {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.OrderUpdateInput) {
    return this.prismaService.order.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  async findAllByCustomerId(customerId: number) {
    return this.prismaService.order.findMany({
      where: { customerId },
    });
  }
}
