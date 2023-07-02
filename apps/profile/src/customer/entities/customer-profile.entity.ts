import { TCustomerProfile } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class CustomerProfile implements TCustomerProfile {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  phone?: string;

  @OneToMany(() => Address, (address) => address.profile)
  addresses: Address[];
}
