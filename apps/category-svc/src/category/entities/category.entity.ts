import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EGlobalStatus, TCategory } from '@shifter-shop/dictionary';

@Entity()
export class Category implements TCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('enum', { enum: EGlobalStatus, default: EGlobalStatus.Default })
  status: EGlobalStatus;
}
