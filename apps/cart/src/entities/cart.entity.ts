import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { TCartItem } from "@shifter-shop/dictionary";

@Entity()
export class CartItem extends BaseEntity implements TCartItem {
  @PrimaryColumn("uuid")
  productId: string;

  @PrimaryColumn("uuid")
  customerId: string;

  @Column("int")
  quantity: number;

  @Column("timestamptz", { default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
