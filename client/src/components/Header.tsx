import AccountIcon from "@icons/account.svg";
import CartIcon from "@icons/cart.svg";
import SearchIcon from "@icons/search.svg";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuthContext, useCartContext } from "@/hooks/context";

const Header = () => {
  const { isAuthenticated } = useAuthContext();
  const { cartItems } = useCartContext();

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="relative flex h-10 w-full max-w-xl">
          <span className="absolute left-3 top-1/2 w-6 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            className="w-full rounded-l-md border border-r-0 border-primary py-2 pl-12 pr-3 focus:outline-none"
            id="search"
            name="search"
            placeholder="Search here..."
            type="text"
          />
          <button className="rounded-r-md border border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-5">
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
            {!!cartItems.length && (
              <div className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {cartItems.length}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
