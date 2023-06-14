import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

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

  async findOneById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      data,
      where: { id },
    });
  }

  async getProfileByUserId(userId: string) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }
}
