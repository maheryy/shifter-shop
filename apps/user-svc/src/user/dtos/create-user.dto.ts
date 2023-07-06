import { EUserRole } from '@shifter-shop/dictionary';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstname!: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastname!: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password!: string;

  @IsEnum(EUserRole)
  @IsOptional()
  role?: EUserRole;
}
