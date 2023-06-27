import { EGlobalStatus } from '@shifter-shop/dictionary';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsEmpty()
  rating?: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsEmpty()
  sellerId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsOptional()
  @IsEnum(EGlobalStatus)
  status?: EGlobalStatus;
}
