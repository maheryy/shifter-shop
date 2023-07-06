import {
  EBusinessRequestStatus,
  TBusinessRequest,
} from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusinessRequest implements TBusinessRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('varchar')
  company: string;

  @Column('varchar')
  intent: string;

  @Column('varchar')
  phone: string;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('enum', {
    enum: EBusinessRequestStatus,
    default: EBusinessRequestStatus.Pending,
  })
  status: EBusinessRequestStatus;
}
