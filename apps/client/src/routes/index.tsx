import { createBrowserRouter, RouteObject } from "react-router-dom";
import accountRoutes from "./account";
import businessRoutes from "./business";
import funnelRoutes from "./funnel";
import publicRoutes from "./public";

const routes: RouteObject[] = [
  publicRoutes,
  accountRoutes,
  businessRoutes,
  funnelRoutes,
];

const router = createBrowserRouter(routes);

export default router;
