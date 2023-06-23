import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/pages/errors/NotFound";
import Customers from "@/pages/Customers";

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
            path: "/products",
            children: [
              {
                path: "",
                element: <div>All products</div>,
              },
              {
                path: "new",
                element: <div>New product</div>,
              },
              {
                path: "categories",
                element: <div>All categories</div>,
              },
            ],
          },
          {
            path: "/*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
