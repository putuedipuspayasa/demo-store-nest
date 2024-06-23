import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  uid?: string;

  @IsNotEmpty()
  name: string;

  description?: string;
}
