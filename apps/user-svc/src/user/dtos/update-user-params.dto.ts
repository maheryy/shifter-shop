import { IsUUID } from 'class-validator';

export class UpdateUserParamsDto {
  @IsUUID()
  id: string;
}
