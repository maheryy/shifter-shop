import { IsUUID } from 'class-validator';

export class UpdateParamsDto {
  @IsUUID()
  id: string;
}
