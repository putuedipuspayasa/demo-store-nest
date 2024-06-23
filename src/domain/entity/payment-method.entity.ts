import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('payment_methods')
export class PaymentMethod extends BaseEntity {
  @Column()
  partner_uid: string;

  @Column()
  name: string;

  @Column()
  flow: string;
}
