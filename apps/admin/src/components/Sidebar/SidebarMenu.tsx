import { ReactNode, useMemo, useState } from "react";
import { useLayoutContext } from "@/hooks/context";
import SidebarMenuItem from "@/components/Sidebar/SidebarMenuItem";
import ChevronIcon from "@icons/chevron-down.svg";

const SidebarMenu = ({ icon, label, baseUrl, items }: SidebarMenuProps) => {
  const { currentPath } = useLayoutContext();
  const isMenuActive = useMemo(
    () => currentPath.startsWith(baseUrl),
    [currentPath, baseUrl]
  );
  const [isMenuOpen, setIsMenuOpen] = useState(isMenuActive);

  const toggleMenu = () => setIsMenuOpen((isMenuOpen) => !isMenuOpen);

  return (
    <li className="relative px-6 py-3">
      <button
        className={
          "inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" +
          (isMenuActive
            ? " text-gray-800 dark:text-gray-100 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-purple-600 before:rounded-tr-lg before:rounded-br-lg"
            : "")
        }
        onClick={toggleMenu}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center gap-4">
          <span className="w-5 h-5">{icon}</span>
          <span>{label}</span>
        </span>
        <span className={"w-3.5 h-3.5" + (isMenuOpen ? " rotate-180" : "")}>
          <ChevronIcon />
        </span>
      </button>
      <ul
        className={
          "overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900 transition-[max-height,opacity,padding,margin] ease-in-out duration-300" +
          (isMenuOpen
            ? " py-2 mt-2 max-h-[36rem] opacity-100"
            : " max-h-0 opacity-25")
        }
        aria-label={`${label} submenu`}
      >
        {items.map((item, key) => (
          <SidebarMenuItem
            key={`${key}-${item.label.toLowerCase()}`}
            label={item.label}
            href={`${baseUrl}/${item.href}`}
          />
        ))}
      </ul>
    </li>
  );
};

interface SidebarMenuProps {
  icon: ReactNode;
  label: string;
  baseUrl: string;
  items: {
    label: string;
    href: string;
  }[];
}

export default SidebarMenu;
