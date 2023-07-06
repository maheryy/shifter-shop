import { ProductsSearchParams } from "@/types/params";
import { DetailedProduct, Product, TUpdateProduct } from "@/types/product";
import isEmpty from "@/utils/isEmpty";
import api from ".";

export type GetProductsResponse = {
  products: Product[];
  pageCount: number;
};

export async function getProducts(
  searchParams?: ProductsSearchParams,
): Promise<GetProductsResponse> {
  if (!searchParams) {
    return api.get("/products").json();
  }

  const { categoryId, ...rest } = searchParams;

  if (!categoryId || isEmpty(categoryId)) {
    return api.query(rest).get("/products").json();
  }

  return api
    .query({
      ...rest,
      categoryId: categoryId.join(","),
    })
    .get("/products")
    .json();
}

export function getProduct(id: Product["id"]): Promise<DetailedProduct> {
  return api.get(`/products/${id}`).json();
}

export function getRelatedProducts(id: Product["id"]): Promise<Product[]> {
  return api.get(`/products/${id}/related`).json();
}

export function updateProduct({
  id,
  data,
}: {
  id: Product["id"];
  data: TUpdateProduct;
}): Promise<Product> {
  console.log(data);

  return api.patch(data, `/products/${id}`).json();
}
