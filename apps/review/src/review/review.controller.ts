import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Headers,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(
    @Headers('user-id') userId: string,
    @Body() review: CreateReviewDto,
  ) {
    // TODO: change these values
    review.author = userId || '5482df68-6f5b-4a4d-b418-9b4b4bd85211';
    review.product = '5482df68-6f5b-4a4d-b418-9b4b4bd85211';
    review.order = '5482df68-6f5b-4a4d-b418-9b4b4bd85211';

    return this.reviewService.create(review);
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOneById(id);
  }

  @Patch('/:id')
  async update(@Body() review: UpdateReviewDto, @Param('id') id: string) {
    return this.reviewService.update(id, review);
  }

  @Get('/product/:productId')
  async findAllByProductId(@Param('productId') productId: string) {
    return this.reviewService.findAllByProductId(productId);
  }
}
