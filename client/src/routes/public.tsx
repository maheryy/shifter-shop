import { RouteObject } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Cart from "@/pages/Cart";
import Checkout, { checkoutLoader } from "@/pages/Checkout";
import FetchFailure from "@/pages/errors/FetchFailure";
import NotFound from "@/pages/errors/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import PostCheckout from "@/pages/PostCheckout";
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
      path: "checkout",
      element: <Checkout />,
      loader: checkoutLoader,
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
    {
      path: "checkout/success",
      element: <PostCheckout />,
    },
  ],
};

export default publicRoutes;
