import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import {
  EOrderStatus,
  TOrder,
  TProductReferenceWithQuantity,
} from "@shifter-shop/types";

@Entity()
export class Order extends BaseEntity implements TOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  customerId: string;

  @Column("character", { length: 10, unique: true })
  reference: string;

  @Column("float")
  amount: number;

  @Column("jsonb")
  products: TProductReferenceWithQuantity[];

  @Column("enum", { enum: EOrderStatus, default: EOrderStatus.Pending })
  status: EOrderStatus;

  @Column("timestamptz", { default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
