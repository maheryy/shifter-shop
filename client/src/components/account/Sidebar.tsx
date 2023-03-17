import { NavLink } from "react-router-dom";
import { useAuthContext, useCustomerContext } from "../../hooks/context";
import UserIcon from "../../assets/icons/user-circle.svg";
import LogoutIcon from "../../assets/icons/out.svg";
import BagIcon from "../../assets/icons/bag.svg";
import ListIcon from "../../assets/icons/queue-list.svg";
import IdentificationIcon from "../../assets/icons/identification.svg";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { logout } = useCustomerContext();

  return (
    <>
      <div className="px-4 py-3 shadow flex items-center gap-2">
        <span className="rounded-full w-14 h-14 text-gray-500">
          <UserIcon />
        </span>
        <div className="flex-grow">
          <p className="text-gray-600">Hello,</p>
          <span className="text-gray-800 font-medium">
            {user!.firstname} {user!.lastname}
          </span>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
        <div className="space-y-1 pl-8">
          <div className="relative block font-medium capitalize transition">
            <span className="absolute -left-7 top-1 w-4 h-4">
              <IdentificationIcon />
            </span>
            Account
          </div>
          <NavLink
            to="/account/profile"
            end
            className={({ isActive }) =>
              "relative hover:text-primary block capitalize transition" +
              (isActive ? " text-primary" : "")
            }
          >
            Profile information
          </NavLink>
          <NavLink
            to="/account/change-password"
            end
            className={({ isActive }) =>
              "relative hover:text-primary block capitalize transition" +
              (isActive ? " text-primary" : "")
            }
          >
            Change password
          </NavLink>
          <NavLink
            to="/account/delete-account"
            end
            className={({ isActive }) =>
              "relative hover:text-primary block capitalize transition" +
              (isActive ? " text-primary" : "")
            }
          >
            Delete account
          </NavLink>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <div className="relative block font-medium capitalize transition">
            <span className="absolute -left-7 top-1 w-4 h-4">
              <ListIcon />
            </span>
            History
          </div>
          <NavLink
            to="/account/orders"
            end
            className={({ isActive }) =>
              "relative hover:text-primary block capitalize transition" +
              (isActive ? " text-primary" : "")
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/account/reviews"
            end
            className={({ isActive }) =>
              "relative hover:text-primary block capitalize transition" +
              (isActive ? " text-primary" : "")
            }
          >
            Reviews
          </NavLink>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <NavLink
            to="/cart"
            className="relative hover:text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-7 top-1 w-4 h-4">
              <BagIcon />
            </span>
            My cart
          </NavLink>
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <button
            onClick={logout}
            className="relative hover:text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-7 top-1 w-4 h-4">
              <LogoutIcon />
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
