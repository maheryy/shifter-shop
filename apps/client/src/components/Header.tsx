import AccountIcon from "@icons/account.svg";
import CartIcon from "@icons/cart.svg";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuthContext } from "@/hooks/context";
import { useProductQuantity } from "@/hooks/useCart";
import { UserRoles } from "@/types/user";
import SearchBar from "./SearchBar";

const Header = () => {
  const { isAuthenticated, user } = useAuthContext();
  const { cartQuery } = useProductQuantity();
  const { data } = cartQuery;

  return (
    <header className="container grid grid-cols-2 grid-rows-2 items-center gap-y-4 bg-white py-4 shadow-sm md:flex md:h-20 md:justify-between md:gap-x-4">
      <Logo />
      <SearchBar />
      <div className="col-start-2 row-start-1 grid grid-flow-col items-center justify-end gap-4">
        <NavLink
          className={({ isActive }) =>
            "relative flex flex-col items-center text-gray-700 transition hover:text-primary" +
            (isActive ? " text-primary" : "")
          }
          to="/cart"
        >
          <span className="block w-6">
            <CartIcon />
          </span>
          <span className="text-xs">Cart</span>
          {!!data && (
            <div className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {data}
            </div>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "relative flex flex-col items-center text-gray-700 transition hover:text-primary" +
            (isActive ? " text-primary" : "")
          }
          to={isAuthenticated ? "/account" : "/login"}
        >
          <span className="block w-6">
            <AccountIcon />
          </span>
          <span className="text-xs">
            {isAuthenticated ? "Account" : "Login"}
          </span>
        </NavLink>
        {user?.role === UserRoles.enum.SELLER && (
          <Link
            className="relative flex flex-col items-center text-gray-700 transition hover:text-primary"
            to="/business/dashboard/products"
          >
            <span className="block w-6">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-xs">Dashboard</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
