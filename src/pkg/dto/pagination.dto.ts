export class PaginationDto {
  limit?: number = 10;
  page?: number = 1;
  search?: string;
  sortField?: string;
  sortDirection?: 'DESC' | 'ASC';
}
