export interface StripeMetadata {
  customerId: string;
  amount: number;
  products: {
    id: string;
    quantity: number;
  }[];
}
