import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity('product_categories')
export class ProductCategory extends BaseEntity {
  @Index()
  @Column({ type: 'varchar' })
  product_uid: string;

  @Index()
  @Column({ type: 'varchar' })
  category_uid: string;

  @ManyToOne(() => Product, (product) => product.product_categories)
  @JoinColumn({ name: 'product_uid', referencedColumnName: 'uid' })
  product: Product;

  @ManyToOne(() => Category, (category) => category.product_categories)
  @JoinColumn({ name: 'category_uid', referencedColumnName: 'uid' })
  category: Category;
}
