import { UserRole } from '@shifter-shop/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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

  @Column('enum', { enum: UserRole, default: UserRole.Customer })
  role: UserRole;
}
