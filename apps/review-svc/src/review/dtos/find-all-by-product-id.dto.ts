import { IsUUID } from 'class-validator';

export class FindAllyByProductIdParamsDto {
  @IsUUID()
  productId: string;
}
