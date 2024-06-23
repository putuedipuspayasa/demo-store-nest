import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
