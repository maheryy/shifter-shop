import { TBusinessProfile } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class BusinessProfile implements TBusinessProfile {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 256 })
  company: string;

  @Column('varchar', { nullable: true, length: 256 })
  website?: string;

  @Column('varchar', { nullable: true, length: 32 })
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
