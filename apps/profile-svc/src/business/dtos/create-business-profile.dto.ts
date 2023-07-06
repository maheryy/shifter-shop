import { TBusinessAddress } from '@shifter-shop/dictionary';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class BusinessAddressDto implements TBusinessAddress {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  line1: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  line2?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  province: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  zip: string;
}

export class CreateBusinessProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  company: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  website?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @IsPhoneNumber('FR')
  @Transform(({ value }: TransformFnParams) => value?.trim())
  phone: string;

  @ValidateNested()
  @Type(() => BusinessAddressDto)
  address: BusinessAddressDto;
}
