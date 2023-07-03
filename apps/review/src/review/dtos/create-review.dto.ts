import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  details?: string;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  rating: number;

  @IsUUID()
  productId: string;

  @IsUUID()
  orderId: string;

  @IsOptional()
  @IsUUID()
  authorId?: string;
}
