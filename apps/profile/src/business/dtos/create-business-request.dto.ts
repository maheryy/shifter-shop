import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusinessRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  customerId?: string;
}
