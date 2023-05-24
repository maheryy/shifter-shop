import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  authorId: string;

  @Transform(({ value }) => ({ connect: { id: value } }))
  product: { connect: { id: string } };

  @Transform(({ value }) => ({ connect: { id: value } }))
  order: { connect: { id: string } };

  @Transform(({ value }) => ({ connect: { id: value } }))
  author: { connect: { id: string } };
}
