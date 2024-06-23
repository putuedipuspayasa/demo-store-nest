import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

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
  description: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'bigint', default: 0 })
  stock: number;

  @Column({ type: 'text', nullable: true })
  cover: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ type: 'text' })
  status: string;
}
