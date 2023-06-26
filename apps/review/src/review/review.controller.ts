import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { joinResources } from '@shifter-shop/helpers';
import { TFullReview, TReview } from '@shifter-shop/dictionary';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(
    @Headers('user-id') userId: string,
    @Body() review: CreateReviewDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException();
    }
    review.authorId = userId;
    return this.reviewService.create(review);
  }

  @Get()
  async findAll() {
    const reviews = await this.reviewService.findAll();
    const results = await joinResources<TFullReview, TReview>(reviews, [
      { service: 'user', key: 'authorId', addKey: 'author' },
      { service: 'product', key: 'productId', addKey: 'product' },
      // { service: 'order', key: 'orderId', addKey: 'order' },
    ]);

    return results;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewService.findOneById(id);
    const [result] = await joinResources<TFullReview, TReview>(
      [review],
      [
        { service: 'user', key: 'authorId', addKey: 'author' },
        { service: 'product', key: 'productId', addKey: 'product' },
        // { service: 'order', key: 'orderId', addKey: 'order' },
      ],
    );

    return result;
  }

  @Patch('/:id')
  @HttpCode(204)
  async update(@Body() review: UpdateReviewDto, @Param('id') id: string) {
    return this.reviewService.update(id, review);
  }

  // TODO: use findAll (GET /) instead with seller filter
  @Get('/product/:productId')
  async findAllByProductId(@Param('productId') productId: string) {
    const reviews = await this.reviewService.findAllByProductId(productId);
    const results = await joinResources<TFullReview, TReview>(reviews, [
      { service: 'user', key: 'authorId', addKey: 'author' },
      { service: 'product', key: 'productId', addKey: 'product' },
      // { service: 'order', key: 'orderId', addKey: 'order' },
    ]);

    return results;
  }
}
