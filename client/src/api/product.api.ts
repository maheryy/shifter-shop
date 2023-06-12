import products from "@data/products.json";
import { ProductsSearchParams } from "@/types/params";
import { Product } from "@/types/product";
import isEmpty from "@/utils/isEmpty";
import api from ".";

// Temporary solution to shuffle hardcoded products
export const getShuffledProducts = (max?: number) => {
  return products
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .slice(0, max);
};

export async function getProducts(
  searchParams?: ProductsSearchParams,
): Promise<Product[]> {
  if (!searchParams) {
    return api.get("/products").json();
  }

  const { categories, ...rest } = searchParams;

  if (!categories || isEmpty(categories)) {
    return api.query(rest).get("/products").json();
  }

  return api
    .query({
      ...rest,
      categories: categories.join(","),
    })
    .get("/products")
    .json();
}

export function getProduct(id: Product["id"]): Promise<Product> {
  return api.get(`/products/${id}`).json();
}

export function getRelatedProducts(id: Product["id"]): Promise<Product[]> {
  return api.get(`/products/${id}/related`).json();
}
