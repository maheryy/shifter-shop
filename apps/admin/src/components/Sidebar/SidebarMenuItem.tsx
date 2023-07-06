import { NavLink } from "react-router-dom";

const SidebarMenuItem = ({ label, href }: SidebarMenuItemProps) => {
  return (
    <li className="relative">
      <NavLink
        className={({ isActive }) =>
          "inline-flex w-full px-4 py-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" +
          (isActive ? " text-gray-800 dark:text-gray-100" : "")
        }
        to={href}
      >
        {label}
      </NavLink>
    </li>
  );
};

interface SidebarMenuItemProps {
  label: string;
  href: string;
}

export default SidebarMenuItem;
