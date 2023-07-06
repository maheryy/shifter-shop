import { RouteObject } from "react-router-dom";
import Seller from "@/components/Seller";
import BusinessLayout from "@/layouts/business/BusinessLayout";
import DashboardLayout from "@/layouts/business/DashboardLayout";
import RegisterLayout from "@/layouts/business/RegisterLayout";
import EditProduct, {
  editProductLoader,
} from "@/pages/business/Dashboard/EditProduct";
import NewProduct from "@/pages/business/Dashboard/NewProduct";
import Orders from "@/pages/business/Dashboard/Orders";
import Products, { productsLoader } from "@/pages/business/Dashboard/Products";
import Profile from "@/pages/business/Dashboard/Profile";
import Reviews from "@/pages/business/Dashboard/Reviews";
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
      element: (
        <Seller>
          <DashboardLayout />
        </Seller>
      ),
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "products",
          element: <Products />,
          loader: productsLoader,
        },
        {
          path: "products/new",
          element: <NewProduct />,
        },
        {
          path: "products/:productId",
          element: <EditProduct />,
          loader: editProductLoader,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "reviews",
          element: <Reviews />,
        },
      ],
    },
  ],
};

export default businessRoutes;
