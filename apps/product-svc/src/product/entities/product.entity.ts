import { EGlobalStatus, TProduct } from '@shifter-shop/dictionary';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity implements TProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('float', { default: 0 })
  rating: number;

  @Column('int', { default: 0 })
  reviewCount: number;

  @Column('float')
  price: number;

  @Column('varchar')
  image: string;

  @Column('uuid')
  categoryId: string;

  @Column('uuid')
  sellerId: string;

  @Column('enum', { enum: EGlobalStatus, default: EGlobalStatus.Default })
  status: EGlobalStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
