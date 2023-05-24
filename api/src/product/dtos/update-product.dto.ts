import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from '@prisma/client';

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
  @IsNotEmpty()
  price?: number;

  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  image?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  categoryId?: string;

  @Transform(({ value }) => ({ connect: { id: value } }))
  category: { connect: { id: string } };
}
