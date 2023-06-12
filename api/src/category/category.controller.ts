import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Public } from 'src/auth/guards/allow.public.guard';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('categories')
  async create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Public()
  @Get('categories')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get('categories/:id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Patch('categories/:id')
  async update(@Body() category: UpdateCategoryDto, @Param('id') id: string) {
    return this.categoryService.update(id, category);
  }
}
