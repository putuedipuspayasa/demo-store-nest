import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Product } from 'src/domain/entity/product.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterProductDto } from '../dto/filter-product.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
  async fetchAll(req: FilterProductDto): Promise<Product[]> {
    return this.filter(req).getMany();
  }

  async fetchPaginate(req: FilterProductDto): Promise<Pagination<Product>> {
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
    // queryBuilder.relation('product_categories');
    // Add join to product_categories table
    // queryBuilder.leftJoinAndSelect('product_categories', 'product_categories');

    // queryBuilder.leftJoinAndSelect('product_categories.category', 'category');

    // queryBuilder.leftJoinAndSelect(
    //   'products.product_categories',
    //   ProductCategory,
    //   'pc',
    //   'pc.product_uid = products.uid', // Adjust this join condition
    // );

    // queryBuilder.leftJoinAndSelect('product_categories', 'category');

    // queryBuilder.leftJoinAndMapOne(
    //   'product_categories.category',
    //   Category,
    //   'cat',
    //   'cat.uid = product_categories.category_uid', // Adjust this join condition
    // );

    const options = {
      limit: req.limit,
      page: req.page,
      // relations: ['product_categories'],
    };

    return paginate<Product>(queryBuilder, options);
  }

  async getByFilter(filter: FilterProductDto): Promise<Product | undefined> {
    return this.filter(filter).getOne();
  }

  filter(filter: FilterProductDto): SelectQueryBuilder<Product> {
    const queryBuilder = this.createQueryBuilder('products');

    if (filter.id) {
      queryBuilder.andWhere('products.id = :id', { id: filter.id });
    }

    if (filter.uid) {
      queryBuilder.andWhere('products.uid = :uid', { uid: filter.uid });
    }

    if (filter.category_uid && filter.category_uid.length > 0) {
      const categoryUid = filter.category_uid;
      queryBuilder.andWhere('products.category_uid IN (:...category_uid)', {
        categoryUid,
      });
    }

    if (filter.name) {
      queryBuilder.andWhere('products.name = :name', { name: filter.name });
    }

    if (filter.status) {
      queryBuilder.andWhere('products.status = :status', {
        name: filter.status,
      });
    }

    if (filter.status_list && filter.status_list.length > 0) {
      const statusList = filter.status_list;
      queryBuilder.andWhere('products.status IN (:...status_list)', {
        statusList,
      });
    }

    if (filter.search) {
      const search = `%${filter.search.toLowerCase()}%`;
      queryBuilder.andWhere('LOWER(products.name) LIKE :search', { search });
    }

    return queryBuilder;
  }
}
