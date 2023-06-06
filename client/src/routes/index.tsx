import { createBrowserRouter, RouteObject } from "react-router-dom";
import { getAddresses } from "@/api/address.api";
import { getCategories } from "@/api/category.api";
import { getProduct, getProducts } from "@/api/product.api";
import PublicLayout from "@/layouts/PublicLayout";
import Cart from "@/pages/Cart";
import FetchFailure from "@/pages/errors/FetchFailure";
import NotFound from "@/pages/errors/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Order, { OrderData } from "@/pages/Order";
import Product from "@/pages/Product";
import ProductList, { ProductListData } from "@/pages/ProductList";
import Register from "@/pages/Register";
import businessRoutes from "./business";
import customerRoutes from "./customer";

const routes: RouteObject[] = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    element: <PublicLayout />,
    errorElement: (
      <PublicLayout>
        <FetchFailure />
      </PublicLayout>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/order",
        element: <Order />,
        loader: async (): Promise<OrderData> => {
          const addresses = getAddresses();

          return {
            addresses,
          };
        },
      },
      {
        path: "/products",
        element: <ProductList />,
        loader: async ({ request }): Promise<ProductListData> => {
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
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  customerRoutes,
  ...businessRoutes,
];

const router = createBrowserRouter(routes);

export default router;
