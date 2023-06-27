import { TCustomerProfile } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class CustomerProfile implements TCustomerProfile {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  phone?: string;

  @Column('varchar', { nullable: true })
  address?: string;

  @Column('varchar', { nullable: true })
  city?: string;

  @Column('varchar', { nullable: true })
  country?: string;

  @Column('varchar', { nullable: true })
  zip?: string;
}
