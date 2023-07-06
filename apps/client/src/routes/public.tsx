import { RouteObject } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Cart from "@/pages/Cart";
import FetchFailure from "@/pages/errors/FetchFailure";
import NotFound from "@/pages/errors/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Product, { productLoader } from "@/pages/Product";
import Products, { productsLoader } from "@/pages/Products";
import Register from "@/pages/Register";

const publicRoutes: RouteObject = {
  element: <PublicLayout />,
  errorElement: (
    <PublicLayout>
      <FetchFailure />
    </PublicLayout>
  ),
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "products",
      children: [
        {
          index: true,
          element: <Products />,
          loader: productsLoader,
        },
        {
          path: ":id",
          element: <Product />,
          loader: productLoader,
          errorElement: <NotFound />,
        },
      ],
    },
    {
      path: "cart",
      element: <Cart />,
    },
  ],
};

export default publicRoutes;
