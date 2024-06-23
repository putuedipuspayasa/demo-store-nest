import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/domain/entity/company.entity';
import { CompanyRepository } from './repository/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [],
  providers: [CompanyRepository],
  exports: [],
})
export class CompanyModule {}
