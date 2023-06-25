import { EUserRole } from '@shifter-shop/dictionary';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  firstname!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  password!: string;

  @IsEnum(EUserRole)
  @IsOptional()
  role?: EUserRole;
}
