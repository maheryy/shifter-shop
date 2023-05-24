import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  async create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }

  @Get('orders')
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('orders/:id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @Patch('orders/:id')
  async update(@Body() order: UpdateOrderStatusDto, @Param('id') id: string) {
    return this.orderService.update(id, order);
  }

  @Get('orders/customer/:customerId')
  async findAllByCustomerId(@Param('customerId') customerId: string) {
    return this.orderService.findAllByCustomerId(customerId);
  }
}
