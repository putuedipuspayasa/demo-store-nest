import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entity/category.entity';
import { Company } from 'src/domain/entity/company.entity';
import { CompanyRepository } from '../company/repository/company.repository';
import { CategoryController } from './controller/category.controller';
import { CategoryRepository } from './repository/category.repository';
import { CategoryUsecase } from './usecase/category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Company])],
  controllers: [CategoryController],
  providers: [CategoryRepository, CompanyRepository, CategoryUsecase],
  exports: [CategoryUsecase],
})
export class CategoryModule {}
