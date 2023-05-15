import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('users/:id')
  async update(@Body() user: User, @Param('id') id: string) {
    return this.userService.update(id, user);
  }
}
