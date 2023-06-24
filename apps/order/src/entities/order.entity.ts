import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { OrderStatus } from "types/order";
import { ProductReferenceWithQuantity } from "types/product";
import { EOrderStatus, TOrder } from "@shifter-shop/types";

@Entity()
export class Order extends BaseEntity implements TOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('uuid')
  customerId: string;

  @Column("character", { length: 10, unique: true })
  reference: string;

  @Column("float")
  amount: number;

  @Column("jsonb")
  products: ProductReferenceWithQuantity[];

  @Column("enum", { enum: OrderStatus, default: OrderStatus.Pending })
  status: EOrderStatus;

  @Column("timestamptz", { default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
