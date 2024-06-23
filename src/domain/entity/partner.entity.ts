import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('partners')
export class Partner extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Index()
  @Column()
  type: string;
}
