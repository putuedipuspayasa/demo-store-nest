import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategory } from './product-category.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', nullable: true })
  company_uid: string;

  @Index({ unique: true })
  @Column({ unique: true })
  @Column({ type: 'varchar' })
  slug: string;

  @Index()
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric', default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ type: 'text', nullable: true })
  cover: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ type: 'text' })
  status: string;

  @OneToMany(
    () => ProductCategory,
    (product_category) => product_category.product,
  )
  product_categories: ProductCategory[];
}
