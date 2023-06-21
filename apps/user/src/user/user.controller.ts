import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SearchCritieriaDto } from './dtos/search-criteria.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  // Private route to be used through microservices
  @Post('/search')
  async searchOne(@Body() criteria: SearchCritieriaDto) {
    return this.userService.searchOne(criteria);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Patch('/:id')
  @HttpCode(204)
  async update(@Body() user: UpdateUserDto, @Param('id') id: string) {
    await this.userService.update(id, user);
  }
}
