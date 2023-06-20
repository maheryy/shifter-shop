import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  price!: number;

  @IsUUID()
  category!: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  seller?: string;
}
