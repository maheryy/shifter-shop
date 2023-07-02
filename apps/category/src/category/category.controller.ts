import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
} from '@nestjs/common';
import { NotEmptyBody } from '@shifter-shop/nest';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dtos/update-category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  // Private route for microservices
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Patch('/:id')
  @HttpCode(204)
  @NotEmptyBody()
  async update(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.categoryService.update(id, category);
  }
}
