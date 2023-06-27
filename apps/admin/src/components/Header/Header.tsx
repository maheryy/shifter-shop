import { useLayoutContext } from "@/hooks/context";
import MenuIcon from "@icons/menu.svg";
import SettingsIcon from "@icons/cog.svg";
import ProfileIcon from "@icons/user.svg";
import LogoutIcon from "@icons/leave.svg";
import NotificationIcon from "@icons/bell.svg";
import LightThemeIcon from "@icons/sun.svg";
import DarkThemeIcon from "@icons/moon.svg";
import Avatar from "@/assets/images/avatar.svg";
import HeaderMenu from "@/components/Header/HeaderMenu";
import { useAuthContext } from "@/hooks/context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { toggleSidebar, toggleTheme, theme } = useLayoutContext();
  const { invalidate } = useAuthContext();
  const navigate = useNavigate();


  const handleLogout = () => {
    invalidate();
    navigate("/login");
  };

  return (
    <header className="h-14 z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div className="flex items-center">
          <button
            className="rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex items-center flex-shrink-0 gap-5">
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <LightThemeIcon className="w-5 h-5" />
              ) : (
                <DarkThemeIcon className="w-5 h-5" />
              )}
            </button>
          </li>

          <li className="relative hidden md:block">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple
                after:absolute after:top-0 after:right-0 after:inline-block after:w-3 after:h-3 after:transform after:translate-x-1 after:-translate-y-1 after:bg-red-600 after:border-2 after:border-white after:rounded-full after:dark:border-gray-800
              "
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <NotificationIcon className="w-5 h-5" />
            </button>
          </li>
          <HeaderMenu
            label="Shiftinho"
            icon={<Avatar className="w-6 h-6" />}
            items={[
              { icon: <ProfileIcon />, label: "Profile", href: "/profile" },
              { icon: <SettingsIcon />, label: "Settings", href: "/settings" },
              { icon: <LogoutIcon />, label: "Log out", onClick: handleLogout, href: "#" },
            ]}
          />
        </ul>
      </div>
    </header>
  );
};

export default Header;
