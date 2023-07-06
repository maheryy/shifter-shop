import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description!: string;

  @IsNumber()
  price!: number;

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  image?: string;
}
