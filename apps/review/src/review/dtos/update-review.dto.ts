import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EGlobalStatus } from '@shifter-shop/dictionary';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  details?: string;

  @IsEmpty()
  status?: EGlobalStatus;

  @IsEmpty()
  rating?: number;

  @IsEmpty()
  productId?: string;

  @IsEmpty()
  orderId?: string;

  @IsEmpty()
  authorId?: string;
}
