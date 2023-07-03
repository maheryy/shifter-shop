import api from "@/api";
import { CheckoutAddress, TAddress } from "@/types/address";
import { StripePayload } from "@/types/stripe";

export function checkout(
  address: Omit<TAddress, "id" | "profile" | "isDefault">,
): Promise<StripePayload> {
  const payload = CheckoutAddress.parse(address);

  return api.post({ address: payload }, "/payment/checkout").json();
}
