import { RouteObject } from "react-router-dom";
import { getOrderAndProduct } from "@/api/order.api";
import CustomerAccountLayout from "@/layouts/CustomerAccountLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import Account from "@/pages/account/Account";
import Addresses, { addressesLoader } from "@/pages/account/Addresses";
import ChangePassword from "@/pages/account/ChangePassword";
import NewAddress from "@/pages/account/NewAddress";
import Orders from "@/pages/account/Orders";
import Profile from "@/pages/account/Profile";
import ReviewForm from "@/pages/account/ReviewForm";
import Reviews from "@/pages/account/Reviews";
import NotFound from "@/pages/errors/NotFound";
import PostCheckout from "@/pages/PostCheckout";

const accountRoutes: RouteObject = {
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

export default accountRoutes;
