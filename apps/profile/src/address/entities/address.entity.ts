import { TAddress } from '@shifter-shop/dictionary';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerProfile } from '../../customer/entities/customer-profile.entity';

@Entity()
export class Address implements TAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerProfile, (profile) => profile.addresses)
  profile: CustomerProfile;

  @Column('varchar', { length: 256 })
  fullName: string;

  @Column('varchar', { length: 256 })
  address1: string;

  @Column('varchar', { nullable: true, length: 256 })
  address2?: string;

  @Column('varchar', { length: 256 })
  city: string;

  @Column('varchar', { length: 16 })
  zip: string;

  @Column('varchar', { length: 256 })
  province: string;

  @Column('varchar', { length: 32 })
  phone: string;

  @Column('boolean', { default: false })
  isDefault: boolean;
}
