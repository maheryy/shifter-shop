import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const LayoutContext = createContext<LayoutContextProps>(null!);

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { pathname: currentPath } = useLocation();

  const toggleSidebar = () =>
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        (event.target as HTMLDivElement).ariaLabel !== "Sidebar menu"
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [sidebarRef, isSidebarOpen]);

  // Close sidebar when navigating to a new page
  useEffect(() => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [currentPath]);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        sidebarRef,
        currentPath,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

interface LayoutProviderProps {
  children: ReactNode;
}

interface LayoutContextProps {
  isSidebarOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
  toggleSidebar: () => void;
  currentPath: string;
}

export default LayoutProvider;
