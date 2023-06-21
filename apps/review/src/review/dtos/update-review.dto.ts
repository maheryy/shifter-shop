import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GlobalStatus } from '@shifter-shop/types';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  rating?: number;

  @IsOptional()
  @IsEnum(GlobalStatus)
  status?: GlobalStatus;
}
