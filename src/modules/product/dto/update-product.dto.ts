import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  uid?: string;

  @IsNotEmpty()
  company_uid: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  category_uid: string[];

  @IsNotEmpty()
  name: string;

  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  tags?: string;

  @IsNotEmpty()
  status: string;
}
