import IdentificationIcon from "@icons/identification.svg";
import LogoutIcon from "@icons/out.svg";
import ListIcon from "@icons/queue-list.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";

function Sidebar() {
  const { user, invalidate } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");

    return null;
  }

  function logOut() {
    invalidate();

    return navigate("/login");
  }

  return (
    <aside className="hidden h-full gap-4 p-4 md:flex md:flex-col">
      <div className="grid gap-4">
        <div className="flex items-center gap-2 font-medium capitalize transition">
          <IdentificationIcon className="h-4 w-4" />
          Account
        </div>
        <NavLink
          className={({ isActive }) =>
            "relative block capitalize transition hover:text-primary" +
            (isActive ? " text-primary" : "")
          }
          end
          to="/business/dashboard/profile"
        >
          Profile information
        </NavLink>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-2 font-medium capitalize transition">
          <ListIcon className="h-4 w-4" />
          Manage
        </div>
        <div className="grid gap-2">
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/business/dashboard/products"
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/business/dashboard/orders"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "relative block capitalize transition hover:text-primary" +
              (isActive ? " text-primary" : "")
            }
            end
            to="/business/dashboard/reviews"
          >
            Reviews
          </NavLink>
        </div>
      </div>
      <div>
        <button
          className="flex items-center gap-2 font-medium capitalize transition hover:text-primary"
          onClick={logOut}
        >
          <LogoutIcon className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
