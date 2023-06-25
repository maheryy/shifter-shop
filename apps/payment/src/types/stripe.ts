import { TProductReferenceWithQuantity } from "@shifter-shop/types";

export interface StripeMetadata {
  customerId: string;
  amount: number;
  products: TProductReferenceWithQuantity[];
}
