import { EGlobalStatus, TFullProduct } from "@shifter-shop/dictionary";
import api from ".";

export type GetProductsResponse = {
  products: TFullProduct[];
  pageCount: number;
};

export const getAllProducts = async (): Promise<GetProductsResponse> => {
  return api.get("/products").json();
};

export const createProduct = async (
  productData: Partial<TFullProduct>
): Promise<TFullProduct> => {
  return api.post(productData, "/products").json();
};

export const setProductStatus = async (
  productId: string,
  status: EGlobalStatus
): Promise<void> => {
  return api.patch({ status }, `/products/${productId}`).res();
}