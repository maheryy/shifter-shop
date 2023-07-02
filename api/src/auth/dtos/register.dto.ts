import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstname!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastname!: string;

  @IsStrongPassword()
  password!: string;
}
