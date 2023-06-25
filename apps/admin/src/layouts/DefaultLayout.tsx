import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <UserProvider>
      <Sidebar />
      <div className="app-content">
        <Header />
        <main>
          <Outlet />
          {children}
        </main>
      </div>
    </UserProvider>
  );
};

interface DefaultLayoutProps {
  children?: ReactNode;
}

export default DefaultLayout;
