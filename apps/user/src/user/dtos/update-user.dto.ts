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

  @IsEnum(['customer', 'admin', 'seller'])
  role?: string;
}
