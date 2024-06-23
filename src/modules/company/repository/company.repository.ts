import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Company } from 'src/domain/entity/company.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterCompanyDto } from '../dto/filter-company.dto';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  async fetchPaginate(req: FilterCompanyDto): Promise<Pagination<Company>> {
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
    queryBuilder.orderBy(`companies.${req.sortField}`, req.sortDirection);

    const options: IPaginationOptions = {
      limit: req.limit,
      page: req.page,
    };

    return paginate<Company>(queryBuilder, options);
  }

  async getByFilter(filter: FilterCompanyDto): Promise<Company | undefined> {
    return this.filter(filter).getOne();
  }

  filter(filter: FilterCompanyDto): SelectQueryBuilder<Company> {
    const queryBuilder = this.createQueryBuilder('companies');

    if (filter.id) {
      queryBuilder.andWhere('companies.id = :id', { id: filter.id });
    }

    if (filter.uid) {
      queryBuilder.andWhere('companies.uid = :uid', { uid: filter.uid });
    }

    if (filter.name) {
      queryBuilder.andWhere('companies.name = :name', { name: filter.name });
    }

    if (filter.search) {
      const search = `%${filter.search.toLowerCase()}%`;
      queryBuilder.andWhere('LOWER(companies.name) LIKE :search', { search });
    }

    return queryBuilder;
  }
}
