import { UserRole } from '@shifter-shop/types';
import { IsEnum, IsNotEmpty, IsEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmpty()
  email?: string;

  @IsNotEmpty()
  firstname?: string;

  @IsNotEmpty()
  lastname?: string;

  @IsEmpty()
  password?: string;

  @IsEnum(UserRole)
  role?: UserRole;
}
