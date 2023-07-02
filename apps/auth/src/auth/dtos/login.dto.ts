import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password!: string;
}
