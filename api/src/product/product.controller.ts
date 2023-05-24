import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  async create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get('products')
  async findAll() {
    return this.productService.findAll();
  }

  @Get('products/:id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Get('products/category/:categoryId')
  async findAllByCategoryId(@Param('categoryId') categoryId: string) {
    return this.productService.findAllByCategoryId(categoryId);
  }

  @Get('products/seller/:sellerId')
  async findAllBySellerId(@Param('sellerId') sellerId: string) {
    return this.productService.findAllBySellerId(sellerId);
  }

  @Patch('products/:id')
  async update(@Body() product: Product, @Param('id') id: string) {
    return this.productService.update(id, product);
  }
}
