import { createBrowserRouter, RouteObject } from "react-router-dom";
import authRoutes from "./auth";
import adminRoutes from "./admin";

const routes: RouteObject[] = [authRoutes, ...adminRoutes];

const router = createBrowserRouter(routes);

export default router;
