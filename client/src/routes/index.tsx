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
import UserLayout from "../layouts/UserLayout";
import ProLayout from "../layouts/ProLayout";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/errors/NotFound";
import PublicLayout from "../layouts/PublicLayout";
import FetchFailure from "../pages/errors/FetchFailure";

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
        path: "/products",
        element: <ProductList />,
        loader: () => getAllProducts(),
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
        loader: () => getCartProducts(),
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: "/user",
        element: <div>User route page</div>,
      },
    ],
  },
  {
    element: <ProLayout />,
    children: [
      {
        path: "/pro",
        element: <div>Pro route page</div>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <div>Admin Dashboard</div>,
      },
      {
        path: "analytics",
        element: <div>Analytics</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
