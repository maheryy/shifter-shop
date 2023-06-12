import { RouteObject } from "react-router-dom";
import { getCategories } from "@/api/category.api";
import { getProduct, getProducts } from "@/api/product.api";
import NotFound from "@/pages/errors/NotFound";
import Product from "@/pages/Product";
import Products, { ProductsData } from "@/pages/Products";
import { ProductsSearchParams } from "@/types/params";

const productsRoutes: RouteObject[] = [
  {
    path: "/products",
    element: <Products />,
    loader: async ({ request }): Promise<ProductsData> => {
      try {
        const searchParams = getProductsSearchParams(request.url);

        const [categories, initialProducts] = await Promise.all([
          getCategories(),
          getProducts(searchParams),
        ]);

        return {
          categories,
          searchParams,
          initialProducts,
        };
      } catch (error) {
        console.error(error);

        throw error;
      }
    },
  },
  {
    path: "/products/:id",
    element: <Product />,
    loader: ({ params }) => getProduct(Number(params.id)),
    errorElement: <NotFound />,
  },
];

function getProductsSearchParams(url: string): ProductsSearchParams {
  const { searchParams } = new URL(url);

  const categories = searchParams.get("categories");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const q = searchParams.get("q");
  const sortBy = searchParams.get("sortBy");

  const productsParams = {
    ...(categories && { categories: categories.split(",").map(Number) }),
    ...(maxPrice && { maxPrice: Number(maxPrice) }),
    ...(minPrice && { minPrice: Number(minPrice) }),
    ...(q && { q }),
    ...(sortBy && { sortBy }),
  };

  return productsParams;
}

export default productsRoutes;
