import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entity/category.entity';
import { ProductCategory } from 'src/domain/entity/product-category.entity';
import { Product } from 'src/domain/entity/product.entity';
import { CategoryRepository } from '../category/repository/category.repository';
import { CompanyRepository } from '../company/repository/company.repository';
import { ProductController } from './controller/product.controller';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductRepository } from './repository/product.repository';
import { GenerateProductSlugService } from './service/product-slug.service';
import { ProductUsecase } from './usecase/product.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductCategory])],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CategoryRepository,
    CompanyRepository,
    ProductCategoryRepository,
    GenerateProductSlugService,
    ProductUsecase,
  ],
  exports: [ProductUsecase],
})
export class ProductModule {}
