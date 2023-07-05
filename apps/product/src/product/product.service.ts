import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  MoreThanOrEqual,
  LessThanOrEqual,
  Repository,
  In,
} from 'typeorm';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import isUUID from 'validator/lib/isUUID';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findAll({
    categoryId,
    maxPrice,
    maxRating,
    minPrice,
    minRating,
    page,
    sellerId,
    sortBy,
    sortDirection,
  }: FindAllQueryDto) {
    const isValidCategoryIds = categoryId?.split(',').every((id) => isUUID(id));

    if (categoryId && !isValidCategoryIds) {
      throw new BadRequestException('Invalid category id');
    }

    const where: FindOptionsWhere<Product> = {
      ...(sellerId && { sellerId }),
      ...(categoryId && { categoryId: In(categoryId.split(',')) }),
      ...(minPrice && {
        price: MoreThanOrEqual(minPrice),
      }),
      ...(minPrice &&
        maxPrice && {
          price: Between(minPrice, maxPrice),
        }),
      ...(maxPrice &&
        !minPrice && {
          price: LessThanOrEqual(maxPrice),
        }),
      ...(minRating && {
        rating: MoreThanOrEqual(minRating),
      }),
      ...(minRating &&
        maxRating && {
          rating: Between(minRating, maxRating),
        }),
      ...(maxRating &&
        !minRating && {
          rating: LessThanOrEqual(maxRating),
        }),
    };

    const order: FindOptionsOrder<Product> = {
      [sortBy ?? 'id']: sortDirection ?? 'ASC',
    };

    const productPerPage = 5;

    const productCount = await this.productRepository.count({ where });

    const pageCount = Math.ceil(productCount / productPerPage);

    const products = await this.productRepository.find({
      where,
      order,
      skip: page ? (page - 1) * productPerPage : 0,
      take: productPerPage,
    });

    return {
      products,
      pageCount,
    };
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} does not exist`);
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    const res = await this.productRepository.update({ id }, data);

    if (!res.affected) {
      throw new NotFoundException(`Product with id: ${id} does not exist`);
    }
  }

  async findAllByCategory(categoryId: string) {
    return this.productRepository.findBy({ categoryId });
  }

  async findAllBySeller(sellerId: string) {
    return this.productRepository.findBy({ sellerId });
  }
}
