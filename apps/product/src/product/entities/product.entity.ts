import { GlobalStatus } from '@shifter-shop/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('float')
  rating: number;

  @Column('float')
  price: number;

  @Column('varchar')
  image: string;

  @Column('uuid')
  category: string;

  @Column('simple-array', { array: true, default: [] })
  reviews: string[];

  @Column('uuid')
  seller: string;

  @Column('enum', { enum: GlobalStatus, default: GlobalStatus.Default })
  status: GlobalStatus;
}
