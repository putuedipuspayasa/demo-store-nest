import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;
}
