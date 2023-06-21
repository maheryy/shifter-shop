export interface StripeMetadata {
  customer: string;
  amount: number;
  products: {
    id: string;
    quantity: number;
  }[];
}
