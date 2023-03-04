import products from "../../data/products.json";
import { Product, ProductWithQuantity } from "../types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  return getShuffledProducts();
};

export const getProduct = async (id: number): Promise<Product> => {
  const product = products.find((product) => product.id == id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const getCartProducts = async (): Promise<ProductWithQuantity[]> => {
  return products.map((e) => ({ ...e, quantity: 1 })).slice(0, 4);
};

export const getRelatedProducts = async (id: number): Promise<Product[]> => {
  return getShuffledProducts().slice(0, 4);
};

// Temporary solution to shuffle hardcoded products
const getShuffledProducts = () => {
  return products
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
};
