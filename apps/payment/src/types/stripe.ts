import { TProductReferenceWithQuantity } from "@shifter-shop/dictionary";
import { TAddress } from "../validation/Address";

export interface StripeMetadata {
  address: TAddress;
  customerId: string;
  amount: number;
  products: TProductReferenceWithQuantity[];
}
