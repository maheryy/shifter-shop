import { RouteObject } from "react-router-dom";
import Auth from "@/components/Auth";
import Checkout from "@/pages/Checkout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";

const funnelRoutes: RouteObject = {
  path: "checkout",
  children: [
    {
      index: true,
      element: (
        <Auth>
          <Checkout />
        </Auth>
      ),
    },
    {
      path: "success",
      element: (
        <Auth>
          <CheckoutSuccess />
        </Auth>
      ),
    },
  ],
};

export default funnelRoutes;
