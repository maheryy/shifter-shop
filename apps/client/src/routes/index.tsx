import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "@/pages/errors/NotFound";
import accountRoutes from "./account";
import businessRoutes from "./business";
import funnelRoutes from "./funnel";
import publicRoutes from "./public";

const routes: RouteObject[] = [
  publicRoutes,
  accountRoutes,
  businessRoutes,
  funnelRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
