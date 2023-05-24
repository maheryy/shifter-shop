import { IsNotEmpty, IsNumber, IsString, IsUUID, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  sellerId: string;

  @Transform(({ value }) => ({ connect: { id: value } }))
  category: { connect: { id: string } };

  @Transform(({ value }) => ({ connect: { id: value } }))
  seller: { connect: { id: string } };
}
