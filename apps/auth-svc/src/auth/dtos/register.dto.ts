import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsNotEmpty()
  @MaxLength(128)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstname!: string;

  @IsNotEmpty()
  @MaxLength(128)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastname!: string;

  @IsStrongPassword()
  password!: string;
}
