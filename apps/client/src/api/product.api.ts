import { ProductsSearchParams } from "@/types/params";
import { DetailedProduct, TProduct, TUpdateProduct } from "@/types/product";
import isEmpty from "@/utils/isEmpty";
import api from ".";

export type GetProductsResponse = {
  products: TProduct[];
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

export function getProduct(id: TProduct["id"]): Promise<DetailedProduct> {
  return api.get(`/products/${id}`).json();
}

export function getRelatedProducts(id: TProduct["id"]): Promise<TProduct[]> {
  return api.get(`/products/${id}/related`).json();
}

export function updateProduct({
  id,
  data,
}: {
  id: TProduct["id"];
  data: TUpdateProduct;
}): Promise<TProduct> {
  console.log(data);

  return api.patch(data, `/products/${id}`).json();
}
