import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from 'src/domain/entity/user.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterUserDto } from '../dto/filter-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async fetchPaginate(req: FilterUserDto): Promise<Pagination<User>> {
    if (req.page === undefined || req.page <= 0) {
      req.page = 1;
    }
    if (req.limit === undefined || req.page <= 0) {
      req.limit = 10;
    }
    if (req.sortField === undefined) {
      req.sortField = 'id';
    }
    if (req.sortDirection === undefined) {
      req.sortDirection = 'DESC';
    }

    const queryBuilder = this.filter(req);
    queryBuilder.orderBy(`users.${req.sortField}`, req.sortDirection);

    const options: IPaginationOptions = {
      limit: req.limit,
      page: req.page,
    };

    return paginate<User>(queryBuilder, options);
  }

  async getByFilter(filter: FilterUserDto): Promise<User | undefined> {
    return this.filter(filter).getOne();
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();
  }

  filter(filter: FilterUserDto): SelectQueryBuilder<User> {
    const queryBuilder = this.createQueryBuilder('users');

    if (filter.id) {
      queryBuilder.andWhere('users.id = :id', { id: filter.id });
    }

    if (filter.uid) {
      queryBuilder.andWhere('users.uid = :uid', { uid: filter.uid });
    }

    if (filter.name) {
      queryBuilder.andWhere('users.name = :name', { name: filter.name });
    }

    if (filter.email) {
      queryBuilder.andWhere('LOWER(users.email) = :email', {
        email: filter.email,
      });
    }

    if (filter.search) {
      const search = `%${filter.search.toLowerCase()}%`;
      queryBuilder.andWhere('LOWER(users.name) LIKE :search', { search });
    }

    return queryBuilder;
  }
}
