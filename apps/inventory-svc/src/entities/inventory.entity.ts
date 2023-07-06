import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { TInventory } from "@shifter-shop/dictionary";

@Entity()
export class Inventory extends BaseEntity implements TInventory {
  @PrimaryColumn("uuid")
  productId: string;

  @Column("int")
  initialQuantity: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
