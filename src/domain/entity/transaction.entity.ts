import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
  @Column({ type: 'float64', default: 0 })
  sub_total: number;

  @Column({ type: 'float64', default: 0 })
  discount_total: number;

  @Column({ type: 'float64', default: 0 })
  tax_total: number;

  @Column({ type: 'float64', default: 0 })
  grand_total: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  payment_status: string;
}
