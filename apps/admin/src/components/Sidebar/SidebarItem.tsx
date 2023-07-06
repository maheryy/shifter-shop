import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, label, href }: SidebarItemProps) => {
  return (
    <li className="relative">
      <NavLink
        to={href}
        className={({ isActive }) =>
          "inline-flex items-center gap-4 w-full px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" +
          (isActive
            ? " text-gray-800 dark:text-gray-100 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-purple-600 before:rounded-tr-lg before:rounded-br-lg"
            : "")
        }
      >
        <span className="w-5 h-5">{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export default SidebarItem;
