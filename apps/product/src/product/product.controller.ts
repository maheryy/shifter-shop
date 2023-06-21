import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Headers('user-id') userId: string,
    @Body() product: CreateProductDto,
  ) {
    // TODO : change these values
    product.seller = userId || '5482df68-6f5b-4a4d-b418-9b4b4bd85211';
    product.image = product.image || 'https://picsum.photos/200';

    return this.productService.create(product);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Patch('/:id')
  @HttpCode(204)
  async update(@Body() product: UpdateProductDto, @Param('id') id: string) {
    return this.productService.update(id, product);
  }

  @Get('/category/:categoryId')
  async findAllByCategoryId(@Param('categoryId') categoryId: string) {
    return this.productService.findAllByCategory(categoryId);
  }

  @Get('/seller/:sellerId')
  async findAllBySellerId(@Param('sellerId') sellerId: string) {
    return this.productService.findAllBySeller(sellerId);
  }
}
