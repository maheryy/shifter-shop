import { IsUUID } from 'class-validator';

export class FindOneParamsDto {
  @IsUUID()
  id: string;
}
