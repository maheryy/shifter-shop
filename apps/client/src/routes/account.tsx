import { RouteObject } from "react-router-dom";
import Auth from "@/components/Auth";
import AccountLayout from "@/layouts/CustomerLayout";
import Account from "@/pages/account/Account";
import Addresses from "@/pages/account/Addresses";
import ChangePassword from "@/pages/account/ChangePassword";
import EditAddress, { editAddressLoader } from "@/pages/account/EditAddress";
import NewAddress from "@/pages/account/NewAddress";
import NewReview, { newReviewLoader } from "@/pages/account/NewReview";
import Orders from "@/pages/account/Orders";
import Profile from "@/pages/account/Profile";
import Reviews from "@/pages/account/Reviews";
import NotFound from "@/pages/errors/NotFound";

const accountRoutes: RouteObject = {
  path: "account",
  element: (
    <Auth>
      <AccountLayout />
    </Auth>
  ),
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
        },
        {
          path: "new",
          element: <NewAddress />,
        },
        {
          path: "edit/:addressId",
          element: <EditAddress />,
          loader: editAddressLoader,
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
    },
    {
      path: "delete-account",
      element: <div>Delete Account</div>,
    },
  ],
};

export default accountRoutes;
