import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  address1: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  address2?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  zip: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  province: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  @MaxLength(32)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  phone: string;

  @IsBoolean()
  @IsOptional()
  setDefault: boolean;
}
