import { RouteObject } from "react-router-dom";
import AccountLayout from "@/layouts/CustomerLayout";
import Account from "@/pages/account/Account";
import Addresses, { addressesLoader } from "@/pages/account/Addresses";
import ChangePassword from "@/pages/account/ChangePassword";
import NewAddress from "@/pages/account/NewAddress";
import NewReview, { newReviewLoader } from "@/pages/account/NewReview";
import Orders from "@/pages/account/Orders";
import Profile from "@/pages/account/Profile";
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
      element: <NewReview />,
      loader: newReviewLoader,
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
