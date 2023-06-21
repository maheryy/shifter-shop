import { Customer } from "./customer";
import { ProductWithQuantity } from "./product";

export interface Order {
  id: number;
  customer: Customer;
  date: Date;
  reference: string;
  status: string;
  total: number;
  products: ProductWithQuantity[];
}
