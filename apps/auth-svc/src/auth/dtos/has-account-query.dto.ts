import { IsEmail } from 'class-validator';

export class HasAccountQueryDto {
  @IsEmail()
  email: string;
}
