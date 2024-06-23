import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('company_payment_credentials')
export class CompanyPaymentCredential extends BaseEntity {
  @Index()
  @Column({ type: 'varchar' })
  partner_uid: string;

  @Index()
  @Column()
  key: string;

  @Index()
  @Column()
  value: string;
}
