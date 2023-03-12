import { Order } from "../types/order";
import orders from "../../data/orders.json";
import { getShuffledProducts } from "./product.api";

export const getOrders = async (): Promise<Order[]> => {
  const res = orders as Order[];

  return res.map((order) => ({
    ...order,
    products: getShuffledProducts(Math.floor(Math.random() * 3) + 1).map(
      (product) => ({ ...product, quantity: 1 })
    ),
  }));
};
