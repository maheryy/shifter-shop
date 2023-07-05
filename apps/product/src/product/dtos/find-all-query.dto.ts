import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsUUID,
  IsEnum,
  IsNumberString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class FindAllQueryDto {
  @IsUUID()
  @IsOptional()
  sellerId?: string;

  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => Number(value))
  minRating?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => Number(value))
  maxRating?: number;

  @IsEnum(['createdAt', 'name', 'price', 'rating', 'reviewCount'])
  @IsOptional()
  orderBy?: string;

  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  direction?: 'ASC' | 'DESC';

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page?: number;
}
