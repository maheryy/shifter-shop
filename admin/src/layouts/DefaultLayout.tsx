import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LayoutProvider from "@/providers/LayoutProvider";

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <LayoutProvider>
      <Sidebar />
      <div className="app-content">
        <Header />
        <main>
          <Outlet />
          {children}
        </main>
      </div>
    </LayoutProvider>
  );
};

interface DefaultLayoutProps {
  children?: ReactNode;
}

export default DefaultLayout;
