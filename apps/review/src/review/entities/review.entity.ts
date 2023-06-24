import { EGlobalStatus } from '@shifter-shop/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TReview } from '@shifter-shop/types';

@Entity()
export class Review implements TReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  title?: string;

  @Column('varchar', { nullable: true })
  details?: string;

  @Column('float')
  rating: number;

  @Column('uuid')
  productId: string;

  @Column('uuid')
  orderId: string;

  @Column('uuid')
  authorId: string;

  @Column('enum', { enum: EGlobalStatus, default: EGlobalStatus.Default })
  status: EGlobalStatus;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
