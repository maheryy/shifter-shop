import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  @Roles(Role.Admin, Role.Customer)
  async create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }

  @Get('orders')
  @Roles(Role.Admin)
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('orders/:id')
  @Roles(Role.Admin)
  async findOne(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @Patch('orders/:id')
  @Roles(Role.Admin)
  async update(@Body() order: UpdateOrderStatusDto, @Param('id') id: string) {
    return this.orderService.update(id, order);
  }

  @Get('orders/customer/:customerId')
  @Roles(Role.Admin, Role.Seller)
  async findAllByCustomerId(@Param('customerId') customerId: string) {
    return this.orderService.findAllByCustomerId(customerId);
  }
}
