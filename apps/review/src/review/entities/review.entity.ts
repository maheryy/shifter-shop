import { GlobalStatus } from '@shifter-shop/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  title?: string;

  @Column('varchar', { nullable: true })
  details?: string;

  @Column('float')
  rating: number;

  @Column('uuid')
  product: string;

  @Column('uuid')
  order: string;

  @Column('uuid')
  author: string;

  @Column('enum', { enum: GlobalStatus, default: GlobalStatus.Default })
  status: GlobalStatus;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
