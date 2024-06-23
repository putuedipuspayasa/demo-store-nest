import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('product_categories')
export class ProductCategory extends BaseEntity {
  @Index()
  @Column({ type: 'varchar' })
  product_uid: string;

  @Index()
  @Column({ type: 'varchar' })
  category_uid: string;
}
