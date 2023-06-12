import { createBrowserRouter, RouteObject } from "react-router-dom";
import { getAddresses } from "@/api/address.api";
import PublicLayout from "@/layouts/PublicLayout";
import Cart from "@/pages/Cart";
import FetchFailure from "@/pages/errors/FetchFailure";
import NotFound from "@/pages/errors/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Order, { OrderData } from "@/pages/Order";
import Register from "@/pages/Register";
import businessRoutes from "./business";
import customerRoutes from "./customer";
import productsRoutes from "./products";

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
        index: true,
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
        path: "/order",
        element: <Order />,
        loader: async (): Promise<OrderData> => {
          const addresses = getAddresses();

          return {
            addresses,
          };
        },
      },
      ...productsRoutes,
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  customerRoutes,
  ...businessRoutes,
];

const router = createBrowserRouter(routes);

export default router;
