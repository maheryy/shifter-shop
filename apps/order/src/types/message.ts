export interface PaymentSuccessData {
  customer: string;
  amount: number;
  products: {
    id: string;
    quantity: number;
  }[];
}
