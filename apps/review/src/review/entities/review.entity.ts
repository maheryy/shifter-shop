import { EGlobalStatus } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TReview } from '@shifter-shop/dictionary';

@Entity()
export class Review implements TReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true, length: 256 })
  title?: string;

  @Column('varchar', { nullable: true, length: 2048 })
  details?: string;

  @Column('float', { default: 0 })
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
