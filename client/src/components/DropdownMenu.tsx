import EllipsisIcon from "@icons/ellipsis-vertical.svg";
import { ReactNode, useState } from "react";

const DropdownMenu = ({ children, label }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className="relative inline-block text-left"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <div className="flex">
        <button
          aria-expanded="true"
          aria-haspopup="true"
          className={
            label
              ? "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              : "w-fit bg-none outline-none"
          }
          id="menu-button"
          onClick={toggle}
          type="button"
        >
          {label || (
            <span className="block h-7 w-7 text-gray-500">
              <EllipsisIcon />
            </span>
          )}
        </button>
      </div>
      {isOpen && (
        <div
          aria-labelledby="menu-button"
          aria-orientation="vertical"
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right animate-fade-in rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          tabIndex={-1}
        >
          <div role="none">{children}</div>
        </div>
      )}
    </div>
  );
};

interface DropdownMenuProps {
  children: ReactNode;
  label?: ReactNode;
}

export default DropdownMenu;
