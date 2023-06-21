import { ProductsSearchParams } from "@/types/params";
import { DetailedProduct, Product } from "@/types/product";
import isEmpty from "@/utils/isEmpty";
import api from ".";

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

export function getProduct(id: Product["id"]): Promise<DetailedProduct> {
  // TODO: remove query params
  return api.get(`/products/${id}?_embed=reviews`).json();
}

export function getRelatedProducts(id: Product["id"]): Promise<Product[]> {
  return api.get(`/products/${id}/related`).json();
}
