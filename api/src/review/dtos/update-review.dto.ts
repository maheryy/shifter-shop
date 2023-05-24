import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '@prisma/client';

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
  @IsEnum(Status)
  status?: Status;
}
