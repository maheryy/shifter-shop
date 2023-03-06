import { Link } from "react-router-dom";
import { useAuthContext, useCartContext } from "../hooks/context";
import Logo from "./Logo";
import AccountIcon from "../assets/icons/account.svg";
import CartIcon from "../assets/icons/cart.svg";
import SearchIcon from "../assets/icons/search.svg";

const Header = () => {
  const { isAuthenticated } = useAuthContext();
  const { cartItems } = useCartContext();

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="w-full max-w-xl relative flex h-10">
          <span className="absolute text-gray-400 w-6 top-1/2 -translate-y-1/2 left-3">
            <SearchIcon />
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-2 pr-3 rounded-l-md focus:outline-none"
            placeholder="Search here..."
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-5">
          <Link
            to="/cart"
            className="flex flex-col items-center text-gray-700 hover:text-primary transition relative"
          >
            <span className="block w-6">
              <CartIcon />
            </span>
            <span className="text-xs">Cart</span>
            {!!cartItems.length && (
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {cartItems.length}
              </div>
            )}
          </Link>
          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="flex flex-col items-center text-gray-700 hover:text-primary transition relative"
          >
            <span className="block w-6">
              <AccountIcon />
            </span>
            <span className="text-xs">
              {isAuthenticated ? "Account" : "Login"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
