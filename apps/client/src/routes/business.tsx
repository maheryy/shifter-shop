import { RouteObject } from "react-router-dom";
import BusinessLayout from "@/layouts/business/BusinessLayout";
import DashboardLayout from "@/layouts/business/DashboardLayout";
import RegisterLayout from "@/layouts/business/RegisterLayout";
import LogIn from "@/pages/business/LogIn";
import Register from "@/pages/business/Register";
import BecomeSeller from "@/pages/business/Register/BecomeSeller";
import BusinessRequest from "@/pages/business/Register/BusinessRequest";
import Finish from "@/pages/business/Register/Finish";
import Landing from "@/pages/business/Register/Landing";

const businessRoutes: RouteObject = {
  path: "business",
  element: <BusinessLayout />,
  children: [
    {
      element: <RegisterLayout />,
      children: [
        {
          path: "register",
          children: [
            {
              index: true,
              element: <Register />,
            },
            {
              path: "landing",
              element: <Landing />,
            },
            {
              path: "business-request",
              element: <BusinessRequest />,
            },
            {
              path: "finish",
              element: <Finish />,
            },
          ],
        },
        {
          path: "login",
          element: <LogIn />,
        },
      ],
    },
    {
      path: "become-seller",
      element: <BecomeSeller />,
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
    },
  ],
};

export default businessRoutes;
