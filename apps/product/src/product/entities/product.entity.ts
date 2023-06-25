import { EGlobalStatus, TProduct } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product implements TProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('float', { default: 0 })
  rating: number;

  @Column('float')
  price: number;

  @Column('varchar')
  image: string;

  @Column('uuid')
  categoryId: string;

  @Column('simple-array', { array: true, default: [] })
  reviewsId: string[];

  @Column('uuid')
  sellerId: string;

  @Column('enum', { enum: EGlobalStatus, default: EGlobalStatus.Default })
  status: EGlobalStatus;
}
