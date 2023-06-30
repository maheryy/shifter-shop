import { TAddress } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';

@Entity()
export class CustomerAddress implements TAddress {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerProfile, (profile) => profile.addresses)
  profile: CustomerProfile;

  @Column('varchar')
  fullName: string;

  @Column('varchar')
  address1: string;

  @Column('varchar', { nullable: true })
  address2?: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  zip: string;

  @Column('varchar')
  province: string;

  @Column('varchar')
  phone: string;
}
