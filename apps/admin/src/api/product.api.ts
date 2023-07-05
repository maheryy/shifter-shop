import { TFullProduct } from "@shifter-shop/dictionary";
import api from ".";

export const getAllProducts = async (): Promise<TFullProduct[]> => {
  return api.get("/products").json();
};

export const createProduct = async (
  productData: Partial<TFullProduct>
): Promise<TFullProduct> => {
  return api.post(productData, "/products").json();
};
