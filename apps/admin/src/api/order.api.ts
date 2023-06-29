import { TFullOrder } from "@shifter-shop/dictionary";
import api from ".";

export const getAllOrders = async (): Promise<TFullOrder[]> => {
  return api.get("/orders").json();
};
