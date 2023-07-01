import { TBusinessProfile } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class BusinessProfile implements TBusinessProfile {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  company: string;

  @Column('varchar', { nullable: true })
  website?: string;

  @Column('varchar', { nullable: true })
  phone?: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  country: string;

  @Column('varchar')
  zip: string;
}
