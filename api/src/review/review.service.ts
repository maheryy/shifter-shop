import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

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

  async findOneById(id: string) {
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with id: ${id} does not exist`);
    }
    return review;
  }

  async update(id: string, data: Prisma.ReviewUpdateInput) {
    return this.prismaService.review.update({
      data,
      where: { id },
    });
  }

  async findAllByAuthorId(authorId: string) {
    const reviews = await this.prismaService.review.findMany({
      where: { authorId },
    });
    if (!reviews) {
      throw new NotFoundException(
        `No reviews found for author with id: ${authorId}`,
      );
    }
    return reviews;
  }

  async findAllByProductId(productId: string) {
    const reviews = await this.prismaService.review.findMany({
      where: { productId },
    });
    if (!reviews) {
      throw new NotFoundException(
        `No reviews found for product with id: ${productId}`,
      );
    }
    return reviews;
  }
}
