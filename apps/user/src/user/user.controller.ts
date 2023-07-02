import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { RemovePassword } from '@shifter-shop/nest';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SearchCriteriaDto } from './dtos/search-criteria.dto';
import { EmptyBodyPipe } from './pipes/empty-body';
import { UpdateAuthenticatedUserDto } from './dtos/update-authenticated-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RemovePassword()
  @Get()
  async findAll(@Query('type') type?: string) {
    return this.userService.findAll(type);
  }

  // Private route to be used through microservices
  @RemovePassword()
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  // Private route to be used through microservices
  // Do not remove password, it's used for authentication
  @Post('/search')
  async searchOne(@Body(new EmptyBodyPipe()) criteria: SearchCriteriaDto) {
    return this.userService.searchOne(criteria);
  }

  // Private route to be used through microservices
  @RemovePassword()
  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  // Admin route to be used through microservices
  @RemovePassword()
  @Patch('/:id')
  async update(
    @Body(new EmptyBodyPipe()) user: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.userService.update(id, user);
  }

  @RemovePassword()
  @Patch()
  async updateAuthenticatedUser(
    @Body(new EmptyBodyPipe()) user: UpdateAuthenticatedUserDto,
    @Headers('user-id') userId: string,
  ) {
    if (!userId) {
      throw new UnauthorizedException();
    }

    return this.userService.update(userId, user);
  }
}
