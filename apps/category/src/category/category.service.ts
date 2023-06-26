import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { CreateCategoryDto } from 'src/category/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    try {
      const categoryInstance = this.categoryRepository.create(data);
      const category = await this.categoryRepository.save(categoryInstance);
      return category;
    } catch (error) {
      if (
        error instanceof TypeORMError &&
        error.message.includes('duplicate')
      ) {
        throw new ConflictException('Category already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOneById(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category with id: ${id} does not exist`);
    }

    return category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    try {
      const res = await this.categoryRepository.update({ id }, data);

      if (!res.affected) {
        throw new NotFoundException(`Category with id: ${id} does not exist`);
      }
    } catch (error) {
      if (
        error instanceof TypeORMError &&
        error.message.includes('duplicate')
      ) {
        throw new ConflictException('Category already exists');
      }
      throw error;
    }
  }
}
