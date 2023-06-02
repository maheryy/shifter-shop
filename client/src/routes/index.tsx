import { createBrowserRouter, RouteObject } from "react-router-dom";
import { getCategories } from "@/api/category.api";
import { getOrderAndProduct } from "@/api/order.api";
import { getProduct, getProducts } from "@/api/product.api";
import CustomerAccountLayout from "@/layouts/CustomerAccountLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import PublicLayout from "@/layouts/PublicLayout";
import Cart from "@/pages/Cart";
import Account from "@/pages/customer/Account";
import ChangePassword from "@/pages/customer/ChangePassword";
import Orders from "@/pages/customer/Orders";
import Profile from "@/pages/customer/Profile";
import ReviewForm from "@/pages/customer/ReviewForm";
import Reviews from "@/pages/customer/Reviews";
import FetchFailure from "@/pages/errors/FetchFailure";
import NotFound from "@/pages/errors/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import PostCheckout from "@/pages/PostCheckout";
import Product from "@/pages/Product";
import ProductList, { ProductListData } from "@/pages/ProductList";
import Register from "@/pages/Register";
import businessRoutes from "./business";

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
  {
    element: <CustomerLayout />,
    children: [
      {
        path: "/account",
        element: <CustomerAccountLayout />,
        children: [
          {
            path: "",
            element: <Account />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:orderId/review/:productId",
            element: <ReviewForm />,
            loader: ({ params }) =>
              getOrderAndProduct(
                Number(params.orderId),
                Number(params.productId),
              ),
            errorElement: <NotFound />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "delete-account",
            element: <div>Delete Account</div>,
          },
        ],
      },
      {
        path: "/checkout/success",
        element: <PostCheckout />,
      },
    ],
  },
  ...businessRoutes,
];

const router = createBrowserRouter(routes);

export default router;
