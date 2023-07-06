import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "@/pages/errors/NotFound";
import accountRoutes from "@/routes/account";
import businessRoutes from "@/routes/business";
import funnelRoutes from "@/routes/funnel";
import publicRoutes from "@/routes/public";

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
