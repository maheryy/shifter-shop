import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import amqp from 'src/lib/amqp';
import { EExchange } from '@shifter-shop/amqp';
import { fetchJson } from '@shifter-shop/helpers';
import { EOrderStatus, EService, TOrder } from '@shifter-shop/dictionary';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(data: CreateReviewDto) {
    const order = await fetchJson<TOrder>(
      { service: EService.Order, endpoint: `/${data.orderId}` },
      { headers: { 'user-id': data.authorId! } },
    );

    if (order.customerId !== data.authorId) {
      throw new ForbiddenException("You can't review this order");
    }

    if (!order) {
      throw new NotFoundException('The order cannot be found');
    }

    if (order.status !== EOrderStatus.Delivered) {
      throw new BadRequestException(
        `Order with id: ${data.orderId} is not delivered`,
      );
    }

    if (!order.products.some((product) => product.id === data.productId)) {
      throw new BadRequestException("The product doesn't belong to the order");
    }

    const countExistingReview = await this.reviewRepository.countBy({
      authorId: data.authorId,
      productId: data.productId,
      orderId: data.orderId,
    });

    if (countExistingReview > 0) {
      throw new BadRequestException('You have already reviewed this product');
    }

    const reviewInstance = this.reviewRepository.create(data);
    const review = await this.reviewRepository.save(reviewInstance);

    const [rating, reviewCount] = await Promise.all([
      this.reviewRepository.average('rating', {
        productId: data.productId,
      }),
      this.reviewRepository.countBy({
        productId: data.productId,
      }),
    ]);

    await amqp.publishToExchange(EExchange.ReviewCreated, {
      productId: data.productId,
      rating: rating || 0,
      reviewCount,
    });

    return review;
  }

  async findAll() {
    return this.reviewRepository.find({ order: { date: 'DESC' } });
  }

  async findOneById(id: string) {
    const review = await this.reviewRepository.findOneBy({ id });

    if (!review) {
      throw new NotFoundException(`Review with id: ${id} does not exist`);
    }

    return review;
  }

  async update(id: string, data: UpdateReviewDto) {
    const res = await this.reviewRepository.update({ id }, data);

    if (!res.affected) {
      throw new NotFoundException(`Review with id: ${id} does not exist`);
    }
  }

  async findAllByAuthorId(authorId: string) {
    return this.reviewRepository.find({
      where: { authorId },
      order: { date: 'DESC' },
    });
  }

  async findAllByProductId(productId: string) {
    return this.reviewRepository.find({
      where: { productId },
      order: { date: 'DESC' },
    });
  }
}
