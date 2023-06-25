import { TOrder } from "@shifter-shop/types";

export interface TPaymentSuccessData {
  customerId: string;
  amount: number;
  products: {
    id: string;
    quantity: number;
  }[];
}

export type TOrderCreatedData = TOrder;
