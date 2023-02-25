import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/context";
import Logo from "./Logo";

const Header = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
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

        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              1
            </div>
          </Link>
          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="text-xs leading-3">
              {isAuthenticated ? "Account" : "Login"}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
