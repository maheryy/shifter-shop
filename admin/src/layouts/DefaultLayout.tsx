import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Sidebar />
      <div className="app-content">
        <Header />
        <main>
          <Outlet />
          {children}
        </main>
      </div>
    </>
  );
};

interface DefaultLayoutProps {
  children?: ReactNode;
}

export default DefaultLayout;
