import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ulid } from 'ulid';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  uid: string;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Index()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  generateUlid() {
    if (!this.uid || this.uid.trim() === '') {
      this.uid = ulid();
    }
  }
}
