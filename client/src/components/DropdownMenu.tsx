import { ReactNode, useState } from "react";
import EllipsisIcon from "@icons/ellipsis-vertical.svg";

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
          type="button"
          className={
            label
              ? "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              : "bg-none outline-none w-fit"
          }
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggle}
        >
          {label || (
            <span className="block w-7 h-7 text-gray-500">
              <EllipsisIcon />
            </span>
          )}
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div role="none">
            {children}
          </div>
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
