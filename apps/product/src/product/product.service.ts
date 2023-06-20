import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import { Repository } from 'typeorm';

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

  async findAll() {
    return this.productRepository.find();
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
    return this.productRepository.findBy({ category: categoryId });
  }

  async findAllBySeller(sellerId: string) {
    return this.productRepository.findBy({ seller: sellerId });
  }
}
