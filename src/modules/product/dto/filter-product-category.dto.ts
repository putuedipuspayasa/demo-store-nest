import { PaginationDto } from 'src/pkg/dto/pagination.dto';

export class FilterProductCategoryDto extends PaginationDto {
  id?: bigint;
  uid?: string;
  category_uid?: string;
  product_uid?: string;
  name?: string;
}
