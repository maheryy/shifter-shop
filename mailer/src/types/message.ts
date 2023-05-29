import { Order } from "types/order";

export enum Queue {
  OrderCreated = "order:created",
}

export interface OrderCreatedData {
  order: Order;
}
