import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
