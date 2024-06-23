import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', nullable: true })
  transaction_uid: string;

  @Index()
  @Column({ type: 'varchar', nullable: true })
  invoice_uid: string;

  @Index()
  @Column({ type: 'varchar', nullable: true })
  payment_method_uid: string;

  @Index()
  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Index()
  @Column()
  status: string;

  @Index()
  @Column()
  payment_code: string;

  @Index()
  @Column()
  payment_name: string;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  paid_at: Date;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  expired_at: Date;

  @Index()
  @Column({ nullable: true })
  partner_reference_no: string;

  @Index()
  @Column({ nullable: true })
  reference_no: string;
}
