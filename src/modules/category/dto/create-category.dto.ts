import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  uid?: string;

  @IsNotEmpty()
  company_uid?: string;

  @IsNotEmpty()
  name: string;

  description?: string;
}
