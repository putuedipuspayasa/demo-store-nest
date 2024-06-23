import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('invoice_items')
export class InvoiceItem extends BaseEntity {
  @Index()
  @Column({ type: 'varchar' })
  invoice_uid: string;

  @Index()
  @Column({ type: 'varchar' })
  product_uid: string;

  @Column({ type: 'numeric', default: 0 })
  quantity: number;

  @Column({ type: 'numeric', default: 0 })
  unit_price: number;

  @Column({ type: 'numeric', default: 0 })
  discount_amount: number;

  @Column({ type: 'numeric', default: 0 })
  total_price: number;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
