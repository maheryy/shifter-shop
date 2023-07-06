import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('FR')
  @Transform(({ value }: TransformFnParams) => value?.trim())
  phone?: string;
}
