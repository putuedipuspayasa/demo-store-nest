import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/domain/entity/user.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterUserDto } from '../dto/filter-user.dto';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByFilter(filter: FilterUserDto): Promise<User>;
    findPaginate(req: FilterUserDto): Promise<Pagination<User>>;
    getByFilter(filter: FilterUserDto): Promise<User | undefined>;
    getByEmail(email: string): Promise<User | undefined>;
    filter(filter: FilterUserDto): SelectQueryBuilder<User>;
}
