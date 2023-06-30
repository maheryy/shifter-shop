import { TCustomerProfile } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { CustomerAddress } from './customer-address.entity';

@Entity()
export class CustomerProfile implements TCustomerProfile {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  phone?: string;

  @OneToMany(() => CustomerAddress, (address) => address.profile)
  addresses: CustomerAddress[];

  @Column('varchar', { nullable: true })
  city?: string;

  @Column('varchar', { nullable: true })
  country?: string;

  @Column('varchar', { nullable: true })
  zip?: string;
}
