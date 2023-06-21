import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

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
  rating!: number;

  @IsOptional()
  product?: string;

  @IsOptional()
  order?: string;

  @IsOptional()
  author?: string;
}
