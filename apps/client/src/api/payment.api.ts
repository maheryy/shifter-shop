import api from "@/api";

export function checkout(): Promise<{ url: string }> {
  return api.post("/payment/checkout").json();
}
