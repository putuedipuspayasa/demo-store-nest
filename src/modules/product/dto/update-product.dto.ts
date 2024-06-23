import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProductStatus } from 'src/domain/constants/product-status';

export class UpdateProductDto {
  uid?: string;

  slug?: string;

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
  @IsEnum(ProductStatus)
  status: string;
}
