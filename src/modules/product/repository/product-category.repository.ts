import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ProductCategory } from 'src/domain/entity/product-category.entity';
import { Product } from 'src/domain/entity/product.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterProductCategoryDto } from '../dto/filter-product-category.dto';

@Injectable()
export class ProductCategoryRepository extends Repository<ProductCategory> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
  async fetchAll(req: FilterProductCategoryDto): Promise<ProductCategory[]> {
    return this.filter(req).getMany();
  }

  async fetchPaginate(
    req: FilterProductCategoryDto,
  ): Promise<Pagination<ProductCategory>> {
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
    queryBuilder.orderBy(`products.${req.sortField}`, req.sortDirection);

    const options: IPaginationOptions = {
      limit: req.limit,
      page: req.page,
    };

    return paginate<ProductCategory>(queryBuilder, options);
  }

  async getByFilter(
    filter: FilterProductCategoryDto,
  ): Promise<ProductCategory | undefined> {
    return this.filter(filter).getOne();
  }

  filter(
    filter: FilterProductCategoryDto,
  ): SelectQueryBuilder<ProductCategory> {
    const queryBuilder = this.createQueryBuilder('product_categories');

    if (filter.id) {
      queryBuilder.andWhere('product_categories.id = :id', { id: filter.id });
    }

    if (filter.uid) {
      queryBuilder.andWhere('product_categories.uid = :uid', {
        uid: filter.uid,
      });
    }

    if (filter.category_uid) {
      queryBuilder.andWhere('product_categories.category_uid = :category_uid', {
        category_uid: filter.category_uid,
      });
    }

    if (filter.product_uid) {
      queryBuilder.andWhere('product_categories.product_uid = :product_uid', {
        product_uid: filter.product_uid,
      });
    }

    // if (filter.search) {
    //   const search = `%${filter.search.toLowerCase()}%`;
    //   queryBuilder.andWhere('LOWER(products.name) LIKE :search', { search });
    // }

    return queryBuilder;
  }
}
