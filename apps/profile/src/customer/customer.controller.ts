import {
  Controller,
  Body,
  Get,
  Patch,
  Headers,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { UpdateProfileDto } from 'src/customer/dtos/update-profile.dto';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/customer')
  async findCustomerProfile(@Headers('user-id') userId: string) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.customerService.findById(userId);
  }

  @Patch('/customer')
  @HttpCode(204)
  async updateCustomerProfile(
    @Headers('user-id') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }
    return this.customerService.update(userId, data);
  }
}
