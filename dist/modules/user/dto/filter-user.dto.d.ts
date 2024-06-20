import { PaginationDto } from 'src/pkg/dto/pagination.dto';
export declare class FilterUserDto extends PaginationDto {
    id?: bigint;
    uid?: string;
    name?: string;
    email?: string;
    phone?: string;
}
