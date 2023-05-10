import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reviews')
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get('reviews/:id')
  async findOne(@Param('id') id: number) {
    return this.reviewService.findOneById(id);
  }

  @Patch('reviews/:id')
  async update(@Body() review: Review, @Param('id') id: number) {
    return this.reviewService.update(id, review);
  }

  @Delete('reviews/:id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }

  @Get('reviews/author/:authorId')
  async findAllByAuthorId(@Param('authorId') authorId: number) {
    return this.reviewService.findAllByAuthorId(authorId);
  }

  @Get('reviews/product/:productId')
  async findAllByProductId(@Param('productId') productId: number) {
    return this.reviewService.findAllByProductId(productId);
  }
}
