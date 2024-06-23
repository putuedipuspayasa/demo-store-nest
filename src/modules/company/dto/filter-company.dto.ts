import { PaginationDto } from 'src/pkg/dto/pagination.dto';

export class FilterCompanyDto extends PaginationDto {
  id?: bigint;
  uid?: string;
  name?: string;
}
