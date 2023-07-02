import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAuthenticatedUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastname?: string;
}
