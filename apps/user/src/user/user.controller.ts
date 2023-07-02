import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  Headers,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SearchCritieriaDto } from './dtos/search-criteria.dto';
import { EmptyBodyPipe } from './pipes/empty-body';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query('type') type?: string) {
    return this.userService.findAll(type);
  }

  // Private route to be used through microservices
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('/count')
  async count(@Query('type') type?: string) {
    return this.userService.count(type);
  }

  // Private route to be used through microservices
  @Post('/search')
  async searchOne(@Body(new EmptyBodyPipe()) criteria: SearchCritieriaDto) {
    return this.userService.searchOne(criteria);
  }

  // Private route to be used through microservices
  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Patch('/:id')
  @HttpCode(204)
  async update(
    @Body(new EmptyBodyPipe()) user: UpdateUserDto,
    @Param('id') id: string,
  ) {
    await this.userService.update(id, user);
  }

  @Patch()
  @HttpCode(204)
  async updateAuthenticatedUser(
    @Body(new EmptyBodyPipe()) user: UpdateUserDto,
    @Headers('user-id') userId: string,
  ) {
    if (!userId) {
      throw new UnauthorizedException();
    }

    await this.userService.update(userId, user);
  }
}
