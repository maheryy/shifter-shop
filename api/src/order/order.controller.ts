import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders')
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('orders/:id')
  async findOne(@Param('id') id: number) {
    return this.orderService.findOneById(id);
  }

  @Patch('orders/:id')
  async update(@Body() order: Order, @Param('id') id: number) {
    return this.orderService.update(id, order);
  }

  @Delete('orders/:id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.orderService.remove(id);
  }

  @Get('orders/customer/:customerId')
  async findAllByCustomerId(@Param('customerId') customerId: number) {
    return this.orderService.findAllByCustomerId(customerId);
  }
}
