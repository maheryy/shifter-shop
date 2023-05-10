import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput) {
    return this.prismaService.review.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.review.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.review.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.ReviewUpdateInput) {
    return this.prismaService.review.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prismaService.review.delete({
      where: { id },
    });
  }
}
