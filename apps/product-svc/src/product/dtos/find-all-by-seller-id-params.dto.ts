import { IsUUID } from 'class-validator';

export class FindAllBySellerIdParamsDto {
  @IsUUID()
  sellerId: string;
}
