import { EOrderStatus, TFullOrder } from "@shifter-shop/dictionary";
import api from ".";

export const getAllOrders = async (): Promise<TFullOrder[]> => {
  return api.get("/orders").json();
};

export const getCountOrders = async (status: EOrderStatus): Promise<number> => {
  return api.get(`/orders/count?status=${status}`).json();
};

export const getConfirmedOrdersByMonths = async (
  months: number
): Promise<{ month: string; number: number }[]> => {
  return api.get(`/orders/count?months=${months}`).json();
};

export const getTotalAmount = async (): Promise<number> => {
  return api.get("/orders/amount/total").json();
};

export const getTotalSoldProducts = async (): Promise<number> => {
  return api.get("/orders/products/total").json();
};
