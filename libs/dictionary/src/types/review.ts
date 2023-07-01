import { TOrder } from "./order";
import { TProduct } from "./product";
import { EGlobalStatus } from "./status";
import { TUserWithoutPassword } from "./user";

export interface TReview {
  id: string;
  title?: string;
  details?: string;
  rating: number;
  productId: string;
  orderId: string;
  authorId: string;
  status: EGlobalStatus;
  date: Date;
}

export interface TFullReview {
  id: string;
  title?: string;
  details?: string;
  rating: number;
  orderId: string;
  productId: string;
  authorId: string;
  product: TProduct;
  order: TOrder;
  author: TUserWithoutPassword;
  status: EGlobalStatus;
  date: Date;
}
