import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.category.findMany();
  }

  async findOneById(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id: ${id} does not exist`);
    }
    return category;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prismaService.category.update({
      data,
      where: { id },
    });
  }
}
