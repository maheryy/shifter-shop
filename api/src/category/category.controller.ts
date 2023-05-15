import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('categories')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get('categories/:id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Patch('categories/:id')
  async update(@Body() category: Category, @Param('id') id: string) {
    return this.categoryService.update(id, category);
  }
}
