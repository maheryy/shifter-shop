import { EGlobalStatus } from '@shifter-shop/dictionary';
import { IsEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  price!: number;

  @IsEmpty()
  rating?: number;

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  sellerId?: string;

  @IsEmpty()
  status?: EGlobalStatus;
}
