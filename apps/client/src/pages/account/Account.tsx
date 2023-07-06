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
import { UserRoles } from "@/types/user";

function Account() {
  const { invalidate, user } = useAuthContext();
  const navigate = useNavigate();

  function logOut() {
    invalidate();

    return navigate("/");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {user?.role === UserRoles.enum.SELLER && (
        <LinkCard
          description="Manage your products"
          icon={
            <div className="flex justify-center">
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </div>
          }
          link="/business/dashboard/products"
          title="Dashboard"
        />
      )}
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
