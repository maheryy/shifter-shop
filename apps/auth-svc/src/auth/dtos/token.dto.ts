import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  token!: string;
}
