import { TBusinessAddress, TBusinessProfile } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class BusinessProfile implements TBusinessProfile {
  @PrimaryColumn('uuid')
  userId: string;

  @Column('varchar')
  company: string;

  @Column('varchar')
  type: string;

  @Column('varchar', { nullable: true })
  website?: string;

  @Column('varchar')
  phone: string;

  @Column('jsonb')
  address: TBusinessAddress;

  @Column('varchar', { nullable: true })
  description?: string;
}
