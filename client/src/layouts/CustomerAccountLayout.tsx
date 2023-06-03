import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/account/Sidebar";

const CustomerAccountLayout = ({ children }: CustomerAccountLayoutProps) => {
  return (
    <div className="container grid gap-4 py-12 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <Sidebar />
      </div>
      <div className="lg:col-span-9">
        <Outlet />
        {children}
      </div>
    </div>
  );
};

interface CustomerAccountLayoutProps {
  children?: ReactNode;
}

export default CustomerAccountLayout;
