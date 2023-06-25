import { TProduct } from "./product";
import { TUserWithoutPassword } from "./user";

export interface TCartItem {
  productId: string;
  customerId: string;
  quantity: number;
  date: Date;
}

export interface TFullCartItem {
  productId: string;
  customerId: string;
  product: TProduct;
  customer: TUserWithoutPassword;
  quantity: number;
  date: Date;
}
