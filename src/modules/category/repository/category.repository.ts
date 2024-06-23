import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Category } from 'src/domain/entity/category.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterCategoryDto } from '../dto/filter-category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
  async fetchAll(req: FilterCategoryDto): Promise<Category[]> {
    return this.filter(req).getMany();
  }

  async fetchPaginate(req: FilterCategoryDto): Promise<Pagination<Category>> {
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
    queryBuilder.orderBy(`categories.${req.sortField}`, req.sortDirection);

    const options: IPaginationOptions = {
      limit: req.limit,
      page: req.page,
    };

    return paginate<Category>(queryBuilder, options);
  }

  async getByFilter(filter: FilterCategoryDto): Promise<Category | undefined> {
    return this.filter(filter).getOne();
  }

  filter(filter: FilterCategoryDto): SelectQueryBuilder<Category> {
    const queryBuilder = this.createQueryBuilder('categories');

    if (filter.id) {
      queryBuilder.andWhere('categories.id = :id', { id: filter.id });
    }

    if (filter.uid) {
      queryBuilder.andWhere('categories.uid = :uid', { uid: filter.uid });
    }

    if (filter.name) {
      queryBuilder.andWhere('categories.name = :name', { name: filter.name });
    }

    if (filter.search) {
      const search = `%${filter.search.toLowerCase()}%`;
      queryBuilder.andWhere('LOWER(categories.name) LIKE :search', { search });
    }

    return queryBuilder;
  }
}
