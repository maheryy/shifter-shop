import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  company?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  website?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(32)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  phone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  line1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  line2?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  city?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  country?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  zip?: string;
}
