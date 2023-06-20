import { GlobalStatus } from '@shifter-shop/types';
import {
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

  @IsOptional()
  @IsUUID()
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsOptional()
  @IsEnum(GlobalStatus)
  status?: GlobalStatus;
}
