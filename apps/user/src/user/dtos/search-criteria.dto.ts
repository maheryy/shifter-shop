import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class SearchCriteriaDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  firstname?: string;

  @IsNotEmpty()
  @IsOptional()
  lastname?: string;
}
