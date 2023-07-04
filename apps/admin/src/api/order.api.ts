import { EOrderStatus, TFullOrder } from "@shifter-shop/dictionary";
import api from ".";

export const getAllOrders = async (): Promise<TFullOrder[]> => {
  return api.get("/orders").json();
};

export const getTopSalesProducts = async (
  top?: number,
  month?: number
): Promise<{ name: string; sales: number }[]> => {
  return api.get(`/orders?top=${top}&month=${month}`).json();
};

export const getCountOrders = async (status: EOrderStatus): Promise<number> => {
  return api.get(`/orders/count?status=${status}`).json();
};

export const getConfirmedOrdersByMonths = async (
  month: number
): Promise<{ month: string; number: number }[]> => {
  return api.get(`/orders/count?month=${month}`).json();
};

export const getTotalAmount = async (month?: number): Promise<number> => {
  return api.get(`/orders/amount/total?month=${month}`).json();
};

export const getTotalSoldProducts = async (month?: number): Promise<number> => {
  return api.get(`/orders/products/total?month=${month}`).json();
};
