import { IsUUID } from 'class-validator';

export class FindAllByCategoryIdParams {
  @IsUUID()
  categoryId: string;
}
