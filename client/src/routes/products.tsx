import { RouteObject } from "react-router-dom";
import { getCategories } from "@/api/category.api";
import { getProduct, getProducts } from "@/api/product.api";
import NotFound from "@/pages/errors/NotFound";
import Product from "@/pages/Product";
import Products, { ProductsData } from "@/pages/Products";

const productsRoutes: RouteObject[] = [
  {
    path: "/products",
    element: <Products />,
    loader: async ({ request }): Promise<ProductsData> => {
      const { searchParams } = new URL(request.url);

      const initialParams = {
        categories: searchParams.get("categories")?.split(",").map(Number),
        maxPrice: Number(searchParams.get("maxPrice")) || undefined,
        minPrice: Number(searchParams.get("minPrice")) || undefined,
        q: searchParams.get("q") || undefined,
        sortBy: searchParams.get("sortBy") || undefined,
      };

      const [categories, initialProducts] = await Promise.all([
        getCategories(),
        getProducts(initialParams),
      ]);

      return {
        categories,
        initialParams,
        initialProducts,
      };
    },
  },
  {
    path: "/products/:id",
    element: <Product />,
    loader: ({ params }) => getProduct(Number(params.id)),
    errorElement: <NotFound />,
  },
];

export default productsRoutes;
