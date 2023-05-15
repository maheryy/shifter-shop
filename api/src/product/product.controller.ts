import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
