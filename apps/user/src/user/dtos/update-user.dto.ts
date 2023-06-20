import { UserRole } from '@shifter-shop/types';
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

  @IsEnum(UserRole)
  role?: UserRole;
}
