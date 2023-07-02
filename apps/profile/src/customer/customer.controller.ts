import {
  Controller,
  Body,
  Get,
  Patch,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UpdateProfileDto } from 'src/customer/dtos/update-profile.dto';
import { CustomerService } from './customer.service';
import { Auth } from '@shifter-shop/nest';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/customer')
  async create(@Body() { userId }: { userId: string }) {
    return this.customerService.create(userId);
  }

  @Auth()
  @Get('/customer')
  async findCustomerProfile(@Headers('user-id') userId: string) {
    return this.customerService.findById(userId);
  }

  @Auth()
  @Patch('/customer')
  @HttpCode(204)
  async updateCustomerProfile(
    @Headers('user-id') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    return this.customerService.update(userId, data);
  }
}
