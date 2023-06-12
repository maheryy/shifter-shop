import { createBrowserRouter, RouteObject } from "react-router-dom";
import accountRoutes from "./account";
import businessRoutes from "./business";
import publicRoutes from "./public";

const routes: RouteObject[] = [publicRoutes, accountRoutes, businessRoutes];

const router = createBrowserRouter(routes);

export default router;
