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
import { Auth } from '@shifter-shop/nest';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import { joinResources } from '@shifter-shop/helpers';
import { TFullProduct, TProduct } from '@shifter-shop/dictionary';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth()
  @Post()
  async create(
    @Headers('user-id') userId: string,
    @Body() product: CreateProductDto,
  ) {
    // TODO : change these values
    product.sellerId = userId;
    product.image = product.image || 'https://picsum.photos/200';

    return this.productService.create(product);
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    const results = await joinResources<TFullProduct, TProduct>(products, [
      { service: 'category', key: 'categoryId', addKey: 'category' },
      { service: 'user', key: 'sellerId', addKey: 'seller' },
    ]);

    return results;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOneById(id);

    const [result] = await joinResources<TFullProduct, TProduct>(
      [product],
      [
        { service: 'category', key: 'categoryId', addKey: 'category' },
        { service: 'user', key: 'sellerId', addKey: 'seller' },
      ],
    );

    return result;
  }

  @Patch('/:id')
  @HttpCode(204)
  async update(@Body() product: UpdateProductDto, @Param('id') id: string) {
    return this.productService.update(id, product);
  }

  // TODO: use findAll (GET /) instead with category filter
  @Get('/category/:categoryId')
  async findAllByCategoryId(@Param('categoryId') categoryId: string) {
    const products = await this.productService.findAllByCategory(categoryId);
    const results = await joinResources<TFullProduct, TProduct>(products, [
      { service: 'category', key: 'categoryId', addKey: 'category' },
      { service: 'user', key: 'sellerId', addKey: 'seller' },
    ]);

    return results;
  }

  // TODO: use findAll (GET /) instead with seller filter
  @Get('/seller/:sellerId')
  async findAllBySellerId(@Param('sellerId') sellerId: string) {
    const products = await this.productService.findAllBySeller(sellerId);
    const results = await joinResources<TFullProduct, TProduct>(products, [
      { service: 'category', key: 'categoryId', addKey: 'category' },
      { service: 'user', key: 'sellerId', addKey: 'seller' },
    ]);

    return results;
  }
}
