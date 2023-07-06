import { createBrowserRouter, RouteObject } from "react-router-dom";
import authRoutes from "@/routes/auth";
import adminRoutes from "@/routes/admin";

const routes: RouteObject[] = [authRoutes, ...adminRoutes];

const router = createBrowserRouter(routes);

export default router;
