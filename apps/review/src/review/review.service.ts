import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import amqp from 'src/lib/amqp';
import { EExchange } from '@shifter-shop/amqp';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(data: CreateReviewDto) {
    const reviewInstance = this.reviewRepository.create(data);
    const review = await this.reviewRepository.save(reviewInstance);
    await amqp.publishToExchange(EExchange.ReviewCreated, review);
    return review;
  }

  async findAll() {
    return this.reviewRepository.find();
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
    return this.reviewRepository.findBy({ authorId });
  }

  async findAllByProductId(productId: string) {
    return this.reviewRepository.findBy({ productId });
  }
}
