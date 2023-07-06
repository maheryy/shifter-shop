import { Module } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { CategoryController } from 'src/category/category.controller';
import { Category } from 'src/category/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
