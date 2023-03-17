import LinkCard from "../../components/account/LinkCard";
import IdentificationIcon from "../../assets/icons/solid/identification.svg";
import CartIcon from "../../assets/icons/solid/cart.svg";
import ReviewIcon from "../../assets/icons/solid/review.svg";
import ListIcon from "../../assets/icons/solid/queue-list.svg";
import ShieldIcon from "../../assets/icons/solid/shield-check.svg";
import LogoutIcon from "../../assets/icons/out.svg";
import { useCustomerContext } from "../../hooks/context";

const Account = () => {
  const { logout } = useCustomerContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      <LinkCard
        title="Order history"
        description="View your order history and details"
        link="/account/orders"
        Icon={ListIcon}
      />
      <LinkCard
        title="Product reviews"
        description="View and manage your product reviews"
        link="/account/reviews"
        Icon={ReviewIcon}
      />
      <LinkCard
        title="Cart"
        description="View your cart"
        link="/cart"
        Icon={CartIcon}
      />
      <LinkCard
        title="Profile information"
        description="Update your account details"
        link="/account/profile"
        Icon={IdentificationIcon}
      />
      <LinkCard
        title="Security"
        description="Change your password"
        link="/account/change-password"
        Icon={ShieldIcon}
      />
      <LinkCard
        title="Logout"
        description="Log out from your account"
        link="#"
        Icon={LogoutIcon}
        onClick={logout}
      />
    </div>
  );
};

export default Account;
