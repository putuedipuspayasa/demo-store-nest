import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('transaction_details')
export class TransactionDetail extends BaseEntity {
  @Column({ type: 'varchar' })
  transaction_uid: string;

  @Column({ type: 'varchar' })
  product_uid: string;

  @Column({ type: 'float64' })
  price: number;

  @Column({ type: 'bigint' })
  qty: number;

  @Column({ type: 'float64' })
  discount_amount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
