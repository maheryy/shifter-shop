import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/pages/errors/NotFound";
import Admins from "@/pages/Admins";
import Customers from "@/pages/Customers";
import Sellers from "@/pages/Sellers";
import Products from "@/pages/Products";

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            index: true,
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
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
