import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @Roles(Role.Admin)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  @Roles(Role.Admin)
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('users/:id')
  @Roles(Role.Admin)
  async update(@Body() user: User, @Param('id') id: string) {
    return this.userService.update(id, user);
  }
}
