import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import LayoutProvider from "@/providers/LayoutProvider";

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <LayoutProvider>
      <UserProvider>
        <Sidebar />
        <div className="app-content">
          <Header />
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <main>
              <Outlet />
              {children}
            </main>
          </div>
        </div>
      </UserProvider>
    </LayoutProvider >
  );
};

interface DefaultLayoutProps {
  children?: ReactNode;
}

export default DefaultLayout;
