import { EGlobalStatus, EUserRole, TUser } from '@shifter-shop/dictionary';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements TUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  firstname: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  password: string;

  @Column('enum', { enum: EUserRole, default: EUserRole.Customer })
  role: EUserRole;

  @Column('enum', { enum: EGlobalStatus, default: EGlobalStatus.Default })
  status: EGlobalStatus;
}
