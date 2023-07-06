import { EBusinessRequestStatus } from '@shifter-shop/dictionary';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateBusinessRequestDto {
  @IsOptional()
  @IsEnum(EBusinessRequestStatus)
  status?: EBusinessRequestStatus;
}
