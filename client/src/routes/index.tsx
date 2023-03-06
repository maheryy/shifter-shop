import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductList from "../pages/ProductList";
import Cart from "../pages/Cart";
import { getProduct } from "../api/product.api";
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/errors/NotFound";
import PublicLayout from "../layouts/PublicLayout";
import FetchFailure from "../pages/errors/FetchFailure";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
        path: "/user",
        element: <div>User route page</div>,
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
