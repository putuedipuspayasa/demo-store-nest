import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @Index()
  @Column({ type: 'varchar' })
  company_uid: string;

  @Index()
  @Column({ type: 'varchar', nullable: true })
  code: string;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  release_date: Date;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  sub_total: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  discount_total: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  tax_total: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  grand_total: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  outstanding: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Index()
  @Column({ type: 'varchar' })
  status: string;

  // Billed To Fields
  @Index()
  @Column({ length: 255, nullable: true })
  billedToName: string;

  @Index()
  @Column({ length: 255, nullable: true })
  billedToEmail: string;

  @Index()
  @Column({ length: 50, nullable: true })
  billedToPhone: string;

  @Index()
  @Column({ type: 'text', nullable: true })
  billedToAddress: string;
}
