import { RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/errors/NotFound";

const authRoutes: RouteObject = {
    element: <AuthLayout />,
    children: [
        {
            path: "/login",
            element: <Login />
        },
        {
            path:"/forgot-password",
            element: <ForgotPassword />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]
}

export default authRoutes;
