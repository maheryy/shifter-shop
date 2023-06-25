import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EGlobalStatus } from '@shifter-shop/types';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsEnum(EGlobalStatus)
  status?: EGlobalStatus;
}
