import { RouteObject } from "react-router-dom";
import RegisterLayout from "@/layouts/business/RegisterLayout";
import LogIn from "@/pages/business/LogIn";
import Register from "@/pages/business/Register";
import BecomeSeller from "@/pages/business/Register/BecomeSeller";
import BusinessInfo from "@/pages/business/Register/BusinessInfo";
import Finish from "@/pages/business/Register/Finish";
import Landing from "@/pages/business/Register/Landing";

const businessRoutes: RouteObject = {
  path: "business",
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
              path: "business-info",
              element: <BusinessInfo />,
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
  ],
};

export default businessRoutes;
