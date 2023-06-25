import { TProductReferenceWithQuantity } from "@shifter-shop/dictionary";

export interface StripeMetadata {
  customerId: string;
  amount: number;
  products: TProductReferenceWithQuantity[];
}
