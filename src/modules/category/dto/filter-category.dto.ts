import { PaginationDto } from 'src/pkg/dto/pagination.dto';

export class FilterCategoryDto extends PaginationDto {
  id?: bigint;
  uid?: string;
  company_uid?: string;
  name?: string;
}
