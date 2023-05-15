import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @Patch('orders/:id')
  async update(@Body() order: Order, @Param('id') id: string) {
    return this.orderService.update(id, order);
  }

  @Get('orders/customer/:customerId')
  async findAllByCustomerId(@Param('customerId') customerId: string) {
    return this.orderService.findAllByCustomerId(customerId);
  }
}
