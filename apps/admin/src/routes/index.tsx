import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/pages/errors/NotFound";
import Customers from "@/pages/Customers";
import AddProduct from "@/pages/Products/AddProduct"
import AddCategory from "@/pages/Categories/AddCategory";

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/analytics",
        element: <div>Analytics</div>,
      },
      {
        path: "/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/newsletter",
        element: <div>Newsletter</div>,
      },
      {
        path: "/profile",
        element: <div>Profile</div>,
      },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
      {
        path: "/products",
        children: [
          {
            path: "add-product",
            element: <AddProduct/>,
          },
          {
            path: "",
            element: <div>All products</div>,
          },
          {
            path: "add-category",
            element: <AddCategory/>,
          },
          {
            path: "categories",
            element: <div>All categories</div>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
