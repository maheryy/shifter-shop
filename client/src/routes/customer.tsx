import { RouteObject } from "react-router-dom";
import { getOrderAndProduct } from "@/api/order.api";
import CustomerAccountLayout from "@/layouts/CustomerAccountLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import Account from "@/pages/customer/Account";
import Addresses, { addressesLoader } from "@/pages/customer/Addresses";
import ChangePassword from "@/pages/customer/ChangePassword";
import NewAddress from "@/pages/customer/NewAddress";
import Orders from "@/pages/customer/Orders";
import Profile from "@/pages/customer/Profile";
import ReviewForm from "@/pages/customer/ReviewForm";
import Reviews from "@/pages/customer/Reviews";
import NotFound from "@/pages/errors/NotFound";
import PostCheckout from "@/pages/PostCheckout";

const customerRoutes: RouteObject = {
  element: <CustomerLayout />,
  children: [
    {
      path: "/account",
      element: <CustomerAccountLayout />,
      children: [
        {
          path: "",
          element: <Account />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "addresses",
          children: [
            {
              index: true,
              element: <Addresses />,
              loader: addressesLoader,
            },
            {
              path: "new",
              element: <NewAddress />,
            },
          ],
        },
        {
          path: "orders/:orderId/review/:productId",
          element: <ReviewForm />,
          loader: ({ params }) =>
            getOrderAndProduct(
              Number(params.orderId),
              Number(params.productId),
            ),
          errorElement: <NotFound />,
        },
        {
          path: "reviews",
          element: <Reviews />,
        },
        {
          path: "delete-account",
          element: <div>Delete Account</div>,
        },
      ],
    },
    {
      path: "/checkout/success",
      element: <PostCheckout />,
    },
  ],
};

export default customerRoutes;
