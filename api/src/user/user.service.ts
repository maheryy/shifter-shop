import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
