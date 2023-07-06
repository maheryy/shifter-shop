import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { joinResources } from '@shifter-shop/helpers';
import { EUserRole, TFullReview, TReview } from '@shifter-shop/dictionary';
import { Auth } from '@shifter-shop/nest';
import { FindAllyByProductIdParamsDto } from './dtos/find-all-by-product-id.dto';
import { ParamsDto } from './dtos/params.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @Post()
  async create(
    @Headers('user-id') userId: string,
    @Body() review: CreateReviewDto,
  ) {
    review.authorId = userId;

    return this.reviewService.create(review);
  }

  @Auth()
  @Get()
  async findAll(
    @Headers('user-id') userId: string,
    @Headers('user-role') userRole: EUserRole,
  ) {
    if (userRole === EUserRole.Admin) {
      const reviews = await this.reviewService.findAll();

      return joinResources<TFullReview, TReview>(reviews, [
        { service: 'user', key: 'authorId', addKey: 'author' },
        { service: 'product', key: 'productId', addKey: 'product' },
        // { service: 'order', key: 'orderId', addKey: 'order' },
      ]);
    }

    const reviews = await this.reviewService.findAllByAuthorId(userId);

    return joinResources<TFullReview, TReview>(reviews, [
      { service: 'user', key: 'authorId', addKey: 'author' },
      { service: 'product', key: 'productId', addKey: 'product' },
    ]);
  }

  @Get('/:id')
  async findOne(@Param() { id }: ParamsDto) {
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

  @Auth()
  @Patch('/:id')
  @HttpCode(204)
  async update(
    @Headers('user-id') userId: string,
    @Headers('user-role') userRole: EUserRole,
    @Body() review: UpdateReviewDto,
    @Param() { id }: ParamsDto,
  ) {
    if (!userId && userRole !== EUserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.reviewService.update(id, review);
  }

  // TODO: use findAll (GET /) instead with seller filter
  @Get('/product/:productId')
  async findAllByProductId(
    @Param() { productId }: FindAllyByProductIdParamsDto,
  ) {
    const reviews = await this.reviewService.findAllByProductId(productId);
    const results = await joinResources<TFullReview, TReview>(reviews, [
      { service: 'user', key: 'authorId', addKey: 'author' },
      { service: 'product', key: 'productId', addKey: 'product' },
      // { service: 'order', key: 'orderId', addKey: 'order' },
    ]);

    return results;
  }
}
