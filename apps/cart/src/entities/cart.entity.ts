import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryColumn("uuid")
  product: string;

  @PrimaryColumn("uuid")
  customer: string;

  @Column("int")
  quantity: number;

  @Column("timestamptz", { default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
