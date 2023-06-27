import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import ChevronIcon from "@icons/chevron-down.svg";

const HeaderMenu = ({ label, icon, items }: HeaderMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isMenuOpen) => !isMenuOpen);

  return (
    <li
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsMenuOpen(false);
        }
      }}
    >
      <button
        className="flex items-center gap-2 rounded-full focus:shadow-outline-purple focus:outline-none"
        onClick={toggleMenu}
        aria-label={`${label} menu`}
        aria-haspopup="true"
      >
        <span className="w-6 h-6">{icon}</span>
        <span className="text-sm">{label}</span>
        <ChevronIcon className="w-3 h-3" />
      </button>
      {isMenuOpen && (
        <ul
          className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700 animate-fade-in"
          aria-label={`${label} submenu`}
        >
          {items.map((item, key) => (
            <li key={`${key}-${item.label}`} className="flex">
              <Link
                onClick={item.onClick || (() => {})}
                to={item.href}
                className="inline-flex gap-3 items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                <span className="w-4 h-4">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

interface HeaderMenuProps {
  label: string;
  icon: ReactNode;
  items: {
    label: string;
    icon: ReactNode;
    href: string;
    onClick?: () => void;
  }[];
}

export default HeaderMenu;
