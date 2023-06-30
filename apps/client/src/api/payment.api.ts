import api from "@/api";
import { StripePayload } from "@/types/stripe";

export function checkout(): Promise<StripePayload> {
  return api.url("/payment/checkout").post().json();
}
