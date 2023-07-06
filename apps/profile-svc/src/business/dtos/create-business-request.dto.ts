import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateBusinessRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  company: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  intent: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  phone: string;
}
