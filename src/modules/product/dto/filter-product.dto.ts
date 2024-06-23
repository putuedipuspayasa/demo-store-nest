import { IsArray, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/pkg/dto/pagination.dto';

export class FilterProductDto extends PaginationDto {
  id?: bigint;
  uid?: string;
  company_uid?: string;
  category_uid?: string[];
  slug?: string;
  name?: string;

  @IsOptional()
  @IsArray()
  status_list?: string[];

  status?: string;
}
