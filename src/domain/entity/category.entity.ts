import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategory } from './product-category.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', nullable: true })
  company_uid: string;

  @Index()
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => ProductCategory,
    (product_category) => product_category.category,
  )
  product_categories: ProductCategory[];
}
