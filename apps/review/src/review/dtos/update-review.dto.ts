import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EGlobalStatus } from '@shifter-shop/dictionary';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
