import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  HttpCode,
  Query,
} from '@nestjs/common';
import { Auth } from '@shifter-shop/nest';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import { joinResources } from '@shifter-shop/helpers';
import { TFullProduct, TProduct } from '@shifter-shop/dictionary';
import { FindOneParamsDto } from './dtos/find-one-params.dto';
import { FindAllBySellerIdParamsDto } from './dtos/find-all-by-seller-id-params.dto';
import { FindAllByCategoryIdParams } from './dtos/find-all-by-category-id-params.dto';
import { UpdateParamsDto } from './dtos/update-params.dto';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import crypto from 'crypto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth()
  @Post()
  async create(
    @Headers('user-id') sellerId: string,
    @Body() product: CreateProductDto,
  ) {
    // TODO : change these values
    product.image = `https://picsum.photos/seed/${crypto.randomUUID()}/300`;

    return this.productService.create(sellerId, product);
  }

  @Get()
  async findAll(@Query() query: FindAllQueryDto) {
    const { products, pageCount } = await this.productService.findAll(query);

    const results = await joinResources<TFullProduct, TProduct>(products, [
      { service: 'category', key: 'categoryId', addKey: 'category' },
      { service: 'user', key: 'sellerId', addKey: 'seller' },
    ]);

    return {
      products: results,
      pageCount,
    };
  }

  @Get('/:id')
  async findOne(@Param() { id }: FindOneParamsDto) {
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
  @HttpCode(200)
  async update(
    @Headers('user-id') sellerId: string,
    @Body() product: UpdateProductDto,
    @Param() { id }: UpdateParamsDto,
  ) {
    return this.productService.update(sellerId, id, product);
  }

  // TODO: use findAll (GET /) instead with category filter
  @Get('/category/:categoryId')
  async findAllByCategoryId(
    @Param() { categoryId }: FindAllByCategoryIdParams,
  ) {
    const products = await this.productService.findAllByCategory(categoryId);
    const results = await joinResources<TFullProduct, TProduct>(products, [
      { service: 'category', key: 'categoryId', addKey: 'category' },
      { service: 'user', key: 'sellerId', addKey: 'seller' },
    ]);

    return results;
  }

  // TODO: use findAll (GET /) instead with seller filter
  @Get('/seller/:sellerId')
  async findAllBySellerId(@Param() { sellerId }: FindAllBySellerIdParamsDto) {
    const products = await this.productService.findAllBySeller(sellerId);
    const results = await joinResources<TFullProduct, TProduct>(products, [
      { service: 'category', key: 'categoryId', addKey: 'category' },
      { service: 'user', key: 'sellerId', addKey: 'seller' },
    ]);

    return results;
  }
}
