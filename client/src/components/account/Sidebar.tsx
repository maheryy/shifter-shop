import BagIcon from "@icons/bag.svg";
import IdentificationIcon from "@icons/identification.svg";
import LogoutIcon from "@icons/out.svg";
import ListIcon from "@icons/queue-list.svg";
import UserIcon from "@icons/user-circle.svg";
import { NavLink } from "react-router-dom";
import { useAuthContext, useCustomerContext } from "@/hooks/context";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { logout } = useCustomerContext();

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3 shadow">
        <span className="h-14 w-14 rounded-full text-gray-500">
          <UserIcon />
        </span>
        <div className="grow">
          <p className="text-gray-600">Hello,</p>
          <span className="font-medium text-gray-800">
            {user!.firstname} {user!.lastname}
          </span>
        </div>
      </div>
      <div className="mt-6 space-y-4 divide-y divide-gray-200 rounded bg-white p-4 text-gray-600 shadow">
        <div className="space-y-1 pl-8">
          <div className="relative block font-medium capitalize transition">
            <span className="absolute -left-7 top-1 h-4 w-4">
              <IdentificationIcon />
            </span>
            Account
          </div>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/account/profile"
          >
            Profile information
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/account/change-password"
          >
            Change password
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/account/delete-account"
          >
            Delete account
          </NavLink>
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <div className="relative block font-medium capitalize transition">
            <span className="absolute -left-7 top-1 h-4 w-4">
              <ListIcon />
            </span>
            History
          </div>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/account/orders"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/account/reviews"
          >
            Reviews
          </NavLink>
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <NavLink
            className="relative block font-medium capitalize transition hover:text-primary"
            to="/cart"
          >
            <span className="absolute -left-7 top-1 h-4 w-4">
              <BagIcon />
            </span>
            My cart
          </NavLink>
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <button
            className="relative block font-medium capitalize transition hover:text-primary"
            onClick={logout}
          >
            <span className="absolute -left-7 top-1 h-4 w-4">
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
