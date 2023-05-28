export enum Queue {
  OrderCreated = "order:created",
  PaymentSuccess = "payment:success",
}

export interface PaymentSuccessData {
  customer: string;
  amount: number;
  products: {
    id: string;
    quantity: number;
  }[];
}
