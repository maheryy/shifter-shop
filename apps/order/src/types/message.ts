export interface PaymentSuccessData {
  customerId: string;
  amount: number;
  products: {
    id: string;
    quantity: number;
  }[];
}
