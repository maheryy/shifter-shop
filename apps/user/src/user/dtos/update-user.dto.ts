import { EUserRole } from '@shifter-shop/dictionary';
import {
  IsEnum,
  IsNotEmpty,
  IsEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmpty()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsEnum(EUserRole)
  role?: EUserRole;
}
