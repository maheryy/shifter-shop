import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  price!: number;
  
  @IsOptional()
  rating?: number;

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  sellerId?: string;
}
