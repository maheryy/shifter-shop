import { EGlobalStatus, EUserRole, TUser } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements TUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 254 })
  email: string;

  @Column('varchar', { length: 128 })
  firstname: string;

  @Column('varchar', { length: 128 })
  lastname: string;

  @Column('varchar', { length: 128 })
  password: string;

  @Column('enum', { enum: EUserRole, default: EUserRole.Customer })
  role: EUserRole;

  @Column('enum', { enum: EGlobalStatus, default: EGlobalStatus.Default })
  status: EGlobalStatus;
}
