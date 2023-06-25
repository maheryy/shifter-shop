import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TCategory } from '@shifter-shop/dictionary';

@Entity()
export class Category implements TCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;
}
