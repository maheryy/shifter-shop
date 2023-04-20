import LinkCard from "@/components/account/LinkCard";
import IdentificationIcon from "@icons/solid/identification.svg";
import CartIcon from "@icons/solid/cart.svg";
import ReviewIcon from "@icons/solid/review.svg";
import ListIcon from "@icons/solid/queue-list.svg";
import ShieldIcon from "@icons/solid/shield-check.svg";
import LogoutIcon from "@icons/out.svg";
import { useCustomerContext } from "@/hooks/context";

const Account = () => {
  const { logout } = useCustomerContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      <LinkCard
        title="Order history"
        description="View your order history and details"
        link="/account/orders"
        icon={<ListIcon />}
      />
      <LinkCard
        title="Product reviews"
        description="View and manage your product reviews"
        link="/account/reviews"
        icon={<ReviewIcon />}
      />
      <LinkCard
        title="Cart"
        description="View your cart"
        link="/cart"
        icon={<CartIcon />}
      />
      <LinkCard
        title="Profile information"
        description="Update your account details"
        link="/account/profile"
        icon={<IdentificationIcon />}
      />
      <LinkCard
        title="Security"
        description="Change your password"
        link="/account/change-password"
        icon={<ShieldIcon />}
      />
      <LinkCard
        title="Logout"
        description="Log out from your account"
        link="#"
        icon={<LogoutIcon />}
        onClick={logout}
      />
    </div>
  );
};

export default Account;
