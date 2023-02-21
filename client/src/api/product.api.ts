import products from "../../data/products.json";
import { Product } from "../types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  return getShuffledProducts().slice(0, 10);
};

export const getProduct = async (id: number): Promise<Product> => {
  const product = products.find((product) => product.id == id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const getCartProducts = async (): Promise<Product[]> => {
  return products.slice(0, 2);
};

// Temporary solution to shuffle hardcoded products
const getShuffledProducts = () => {
  return products
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
};
