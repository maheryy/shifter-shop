import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TCategory } from '@shifter-shop/dictionary';

@Entity()
export class Category implements TCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 256 })
  name: string;

  @Column('varchar', { nullable: true, length: 2048 })
  description?: string;
}
