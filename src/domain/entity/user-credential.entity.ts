import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user_credentials')
export class UserCredential extends BaseEntity {
  @Column({ type: 'varchar' })
  user_uid: string;

  @Column()
  type: string;

  @Column()
  value: string;
}
