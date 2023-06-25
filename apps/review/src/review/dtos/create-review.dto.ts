import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsNotEmpty()
  rating!: number;

  @IsUUID()
  productId!: string;

  @IsUUID()
  orderId!: string;

  @IsOptional()
  authorId?: string;
}
