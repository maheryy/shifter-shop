import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOneById(id);
  }

  @Patch('reviews/:id')
  async update(@Body() review: Review, @Param('id') id: string) {
    return this.reviewService.update(id, review);
  }

  @Get('reviews/author/:authorId')
  async findAllByAuthorId(@Param('authorId') authorId: string) {
    return this.reviewService.findAllByAuthorId(authorId);
  }

  @Get('reviews/product/:productId')
  async findAllByProductId(@Param('productId') productId: string) {
    return this.reviewService.findAllByProductId(productId);
  }
}
