import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/domain/entity/product-category.entity';
import { Product } from 'src/domain/entity/product.entity';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { CompanyRepository } from 'src/modules/company/repository/company.repository';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { ProductCategoryRepository } from '../repository/product-category.repository';
import { ProductRepository } from '../repository/product.repository';
import { GenerateProductSlugService } from '../service/product-slug.service';

@Injectable()
export class ProductUsecase {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    private companyRepository: CompanyRepository,
    private productCategoryRepository: ProductCategoryRepository,
    private readonly slugService: GenerateProductSlugService,
    private dataSource: DataSource,
  ) {}

  async store(req: CreateProductDto): Promise<Product> {
    const company = await this.companyRepository.getByFilter({
      uid: req.company_uid,
    });

    if (!company) {
      throw new Error('Invalid company');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const slugVal = await this.slugService.generateSlug(req.name);
      // const slugVal = '';
      const product = this.productRepository.create({
        slug: slugVal,
        company_uid: req.company_uid,
        name: req.name,
        price: req.price,
        stock: req.stock,
        tags: req.tags,
        status: req.status,
      });

      // return product;

      const storeProduct = await queryRunner.manager.save(product);
      if (!storeProduct) {
        await queryRunner.rollbackTransaction();
        throw new Error('Failed to store product');
      }

      for (const categoryUid of req.category_uid) {
        const categoryCheck = await this.categoryRepository.getByFilter({
          uid: categoryUid,
        });
        if (!categoryCheck) {
          await queryRunner.rollbackTransaction();
          throw new Error('Invalid category');
        }
        const productCategory = new ProductCategory();
        productCategory.category_uid = categoryUid;
        productCategory.product_uid = storeProduct.uid;

        const storeProductCategory = queryRunner.manager.save(productCategory);
        if (!storeProductCategory) {
          await queryRunner.rollbackTransaction();
          throw new Error('Failed to store product');
        }
      }

      await queryRunner.commitTransaction();
      return storeProduct;
    } catch (err: any) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  get(uid: string): Promise<Product> {
    return this.productRepository.getByFilter({ uid: uid });
  }

  fetchAll(req: FilterProductDto) {
    return this.productRepository.fetchAll(req);
  }

  fetchPaginate(req: FilterProductDto) {
    return this.productRepository.fetchPaginate(req);
  }

  // async update(uid: string, req: UpdateProductDto): Promise<Product> {
  //   await this.productRepository.update({ uid: uid }, req);
  //   return this.get(uid);
  // }

  async delete(uid: string): Promise<void> {
    await this.productRepository.delete({ uid: uid });
  }
}
