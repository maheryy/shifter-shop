import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { Public } from 'src/auth/guards/allow.public.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('reviews')
  @Roles(Role.Admin, Role.Customer)
  async create(@Body() review: CreateReviewDto) {
    return this.reviewService.create(review);
  }

  @Get('reviews')
  @Roles(Role.Admin)
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get('reviews/:id')
  @Roles(Role.Admin)
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOneById(id);
  }

  @Patch('reviews/:id')
  @Roles(Role.Admin)
  async update(@Body() review: UpdateReviewDto, @Param('id') id: string) {
    return this.reviewService.update(id, review);
  }

  @Get('reviews/author/:authorId')
  async findAllByAuthorId(@Param('authorId') authorId: string) {
    return this.reviewService.findAllByAuthorId(authorId);
  }

  @Public()
  @Get('reviews/product/:productId')
  async findAllByProductId(@Param('productId') productId: string) {
    return this.reviewService.findAllByProductId(productId);
  }
}
