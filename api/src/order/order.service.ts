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

  async findOneById(id: string) {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return this.prismaService.order.update({
      data,
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  async findAllByCustomerId(customerId: string) {
    return this.prismaService.order.findMany({
      where: { customerId },
    });
  }
}
