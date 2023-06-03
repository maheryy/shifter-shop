import AccountIcon from "@icons/account.svg";
import CartIcon from "@icons/cart.svg";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuthContext, useCartContext } from "@/hooks/context";
import SearchBar from "./SearchBar";

const Header = () => {
  const { isAuthenticated } = useAuthContext();
  const { cartItems } = useCartContext();

  return (
    <header className="container grid h-20 grid-cols-2 grid-rows-2 items-center gap-y-4 bg-white py-4 shadow-sm md:flex md:justify-between md:gap-x-4">
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
    </header>
  );
};

export default Header;
