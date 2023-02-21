import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductList from "../pages/ProductList";
import Cart from "../pages/Cart";
import {
  getAllProducts,
  getCartProducts,
  getProduct,
} from "../api/product.api";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    loader: () => getAllProducts(),
  },
  {
    path: "/products",
    element: <ProductList />,
    loader: () => getAllProducts(),
  },
  {
    path: "/products/:id",
    element: <Product />,
    loader: ({ params }) => getProduct(Number(params.id)),
  },
  {
    path: "/cart",
    element: <Cart />,
    loader: () => getCartProducts(),
  },
];

const router = createBrowserRouter(routes);

export default router;
