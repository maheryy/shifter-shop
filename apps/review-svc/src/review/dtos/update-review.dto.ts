import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EGlobalStatus } from '@shifter-shop/dictionary';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  details?: string;

  @IsEnum(EGlobalStatus)
  @IsOptional()
  status?: EGlobalStatus;
}
