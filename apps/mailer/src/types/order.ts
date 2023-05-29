export interface Order {
  id: string;
  customer: string;
  date: Date;
  reference: string;
  status: OrderStatus;
  amount: number;
  products: ProductReferenceWithQuantity[];
}

export enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipping = "Shipping",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface ProductReferenceWithQuantity {
  id: string;
  quantity: number;
}
