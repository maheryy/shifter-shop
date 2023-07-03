import HomeIcon from "@icons/home.svg";
import LogoutIcon from "@icons/out.svg";
import CartIcon from "@icons/solid/cart.svg";
import IdentificationIcon from "@icons/solid/identification.svg";
import ListIcon from "@icons/solid/queue-list.svg";
import ReviewIcon from "@icons/solid/review.svg";
import ShieldIcon from "@icons/solid/shield-check.svg";
import { useNavigate } from "react-router-dom";
import LinkCard from "@/components/account/LinkCard";
import { useAuthContext } from "@/hooks/context";

function Account() {
  const { invalidate } = useAuthContext();
  const navigate = useNavigate();

  function logOut() {
    invalidate();

    return navigate("/");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <LinkCard
        description="View your order history and details"
        icon={<ListIcon />}
        link="/account/orders"
        title="Order history"
      />
      <LinkCard
        description="View and manage your product reviews"
        icon={<ReviewIcon />}
        link="/account/reviews"
        title="Product reviews"
      />
      <LinkCard
        description="View your cart"
        icon={<CartIcon />}
        link="/cart"
        title="Cart"
      />
      <LinkCard
        description="Update your account details"
        icon={<IdentificationIcon />}
        link="/account/profile"
        title="Profile information"
      />
      <LinkCard
        description="Update your addresses"
        icon={<HomeIcon />}
        link="/account/addresses"
        title="Saved addresses"
      />
      <LinkCard
        description="Change your password"
        icon={<ShieldIcon />}
        link="/account/change-password"
        title="Security"
      />
      <LinkCard
        description="Log out from your account"
        icon={<LogoutIcon />}
        link="#"
        onClick={logOut}
        title="Logout"
      />
    </div>
  );
}

export default Account;
