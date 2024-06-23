import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProductCategory } from 'src/domain/entity/product-category.entity';
import { Product } from 'src/domain/entity/product.entity';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { CompanyRepository } from 'src/modules/company/repository/company.repository';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
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

      const product = this.productRepository.create({
        slug: slugVal,
        company_uid: req.company_uid,
        name: req.name,
        description: req.description,
        price: req.price,
        stock: req.stock,
        tags: req.tags,
        status: req.status,
      });

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
    return this.productRepository.findOne({
      where: { uid: uid },
      relations: ['product_categories', 'product_categories.category'],
    });
  }

  fetchAll(req: FilterProductDto) {
    return this.productRepository.fetchAll(req);
  }

  fetchPaginate(req: FilterProductDto): Promise<Pagination<Product>> {
    return this.productRepository.fetchPaginate(req);
  }

  async update(uid: string, req: UpdateProductDto): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.productRepository.findOneBy({
        uid: uid,
        company_uid: req.company_uid,
      });
      if (!product) {
        throw new Error('Invalid product');
      }

      if (req.name != product.name) {
        const slugVal = await this.slugService.generateSlug(req.name);
        product.slug = slugVal;
      }
      product.company_uid = req.company_uid;
      product.name = req.name;
      product.description = req.description;
      product.price = req.price;
      product.stock = req.stock;
      product.tags = req.tags;
      product.status = req.status;

      const updateProduct = await queryRunner.manager.save(Product, product);
      if (!updateProduct) {
        await queryRunner.rollbackTransaction();
        throw new Error('Failed to update product');
      }

      await queryRunner.manager.delete(ProductCategory, {
        product_uid: product.uid,
      });

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
        productCategory.product_uid = product.uid;

        const storeProductCategory = queryRunner.manager.save(productCategory);
        if (!storeProductCategory) {
          await queryRunner.rollbackTransaction();
          throw new Error('Failed to store category product');
        }
      }

      await queryRunner.commitTransaction();

      return this.get(uid);
    } catch (err: any) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async delete(uid: string): Promise<void> {
    await this.productRepository.delete({ uid: uid });
  }

  async uploadImage(uid: string, fileName: string): Promise<Product> {
    try {
      const product = await this.productCategoryRepository.findOneBy({
        uid: uid,
      });
      if (!product) {
        throw new Error('Product not found');
      }
      await this.productRepository.update(
        { uid: uid },
        {
          cover: fileName,
        },
      );
      return this.get(uid);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
