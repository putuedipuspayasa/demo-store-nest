import { Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entity/category.entity';
import { CompanyRepository } from 'src/modules/company/repository/company.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FilterCategoryDto } from '../dto/filter-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CategoryUsecase {
  constructor(
    private categoryRepository: CategoryRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async store(req: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create({
        name: req.name,
        description: req.description,
      });

      if (req.company_uid) {
        const company = await this.companyRepository.getByFilter({
          uid: req.company_uid,
        });

        if (!company) {
          throw new Error('Invalid company');
        }

        category.company_uid = company.uid;
      }
      const storeCategory = await this.categoryRepository.save(category);
      return storeCategory;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  get(uid: string): Promise<Category> {
    return this.categoryRepository.getByFilter({ uid: uid });
  }

  fetchAll(req: FilterCategoryDto) {
    return this.categoryRepository.fetchAll(req);
  }

  fetchPaginate(req: FilterCategoryDto) {
    return this.categoryRepository.fetchPaginate(req);
  }

  async update(uid: string, req: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update({ uid: uid }, req);
    return this.get(uid);
  }

  async delete(uid: string): Promise<void> {
    await this.categoryRepository.delete({ uid: uid });
  }
}
