import { Order } from "@/types/order";
import api from ".";

export function getOrders(): Promise<Order[]> {
  return api.get("/orders").json();
}

export function getOrder(id: Order["id"]): Promise<Order> {
  return api.get(`/orders/${id}`).json();
}
