import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Sidebar from "@/components/account/Sidebar";

const CustomerAccountLayout = ({ children }: CustomerAccountLayoutProps) => {
  return (
    <div className="container grid grid-cols-12 gap-6 py-12">
      <div className="col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-9">
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
