import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { OrderStatus } from "types/order";
import { ProductReferenceWithQuantity } from "types/product";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  customer: string;

  @Column("character", { length: 10, unique: true })
  reference: string;

  @Column("float")
  total: number;

  @Column("jsonb")
  products: ProductReferenceWithQuantity[];

  @Column("enum", { enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column("timestamptz", { default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
