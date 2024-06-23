import { IsNotEmpty } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  company_uid: string;

  @Index({ unique: true })
  @Column({ unique: true })
  username: string;

  @Index()
  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Index()
  @Column({
    nullable: true,
    length: 50,
  })
  phone: string;
}
