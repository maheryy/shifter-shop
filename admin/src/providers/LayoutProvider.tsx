import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const LayoutContext = createContext<LayoutContextProps>(null!);

const getCurrentTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getCurrentTheme());
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { pathname: currentPath } = useLocation();

  const toggleSidebar = () =>
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);

  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  // Close sidebar when clicking outside
  // TODO: find a better solution to ignore the toggle button (preventing event loop)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).parentElement?.ariaLabel !==
          "Toggle sidebar"
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

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        sidebarRef,
        currentPath,
        theme,
        toggleTheme,
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
  theme: "light" | "dark";
  currentPath: string;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export default LayoutProvider;
