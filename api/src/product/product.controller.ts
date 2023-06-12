import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dtos/create-product.dto';
import { Public } from 'src/auth/guards/allow.public.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  @Roles(Role.Admin, Role.Seller)
  async create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Public()
  @Get('products')
  async findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get('products/:id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Public()
  @Get('products/category/:categoryId')
  async findAllByCategoryId(@Param('categoryId') categoryId: string) {
    return this.productService.findAllByCategoryId(categoryId);
  }

  @Public()
  @Get('products/seller/:sellerId')
  async findAllBySellerId(@Param('sellerId') sellerId: string) {
    return this.productService.findAllBySellerId(sellerId);
  }

  @Patch('products/:id')
  @Roles(Role.Admin, Role.Seller)
  async update(@Body() product: Product, @Param('id') id: string) {
    return this.productService.update(id, product);
  }
}
