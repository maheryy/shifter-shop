import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @Transform(({ value }) => ({ connect: { id: value } }))
  customer: { connect: { id: string } };
}
