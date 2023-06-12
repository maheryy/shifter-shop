import { RouteObject } from "react-router-dom";
import { getOrderAndProduct } from "@/api/order.api";
import AccountLayout from "@/layouts/CustomerLayout";
import Account from "@/pages/account/Account";
import Addresses, { addressesLoader } from "@/pages/account/Addresses";
import ChangePassword from "@/pages/account/ChangePassword";
import NewAddress from "@/pages/account/NewAddress";
import Orders from "@/pages/account/Orders";
import Profile from "@/pages/account/Profile";
import ReviewForm from "@/pages/account/ReviewForm";
import Reviews, { reviewsLoader } from "@/pages/account/Reviews";
import NotFound from "@/pages/errors/NotFound";

const accountRoutes: RouteObject = {
  path: "account",
  element: <AccountLayout />,
  children: [
    {
      index: true,
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
        getOrderAndProduct(Number(params.orderId), Number(params.productId)),
      errorElement: <NotFound />,
    },
    {
      path: "reviews",
      element: <Reviews />,
      loader: reviewsLoader,
    },
    {
      path: "delete-account",
      element: <div>Delete Account</div>,
    },
  ],
};

export default accountRoutes;
