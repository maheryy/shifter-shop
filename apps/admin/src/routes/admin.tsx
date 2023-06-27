import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/pages/errors/NotFound";
import Admins from "@/pages/Admins";
import Customers from "@/pages/Customers";
import Sellers from "@/pages/Sellers";
import Products from "@/pages/Products";
import Orders from "@/pages/Orders";
import Categories from "@/pages/Categories";

const adminRoutes: RouteObject[] = [
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
        element: <Orders />,
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
        path: "/users",
        children: [
          {
            path: "admins",
            element: <Admins />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "sellers",
            element: <Sellers />,
          },
        ],
      },
      {
        path: "/products",
        children: [
          {
            path: "",
            element: <Products />,
          },
          {
            path: "new",
            element: <div>New product</div>,
          },
        ],
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default adminRoutes;
