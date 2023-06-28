import { EUserRole } from '@shifter-shop/dictionary';
import {
  IsEnum,
  IsNotEmpty,
  IsEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastname?: string;

  @IsEmpty()
  email?: string;

  @IsEmpty()
  password?: string;

  @IsEnum(EUserRole)
  @IsOptional()
  role?: EUserRole;
}