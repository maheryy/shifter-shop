import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/account/Sidebar";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomerProvider from "@/providers/CustomerProvider";

interface AccountLayoutProps {
  children?: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <CustomerProvider>
      <Header />
      <main>
        <div className="container grid gap-4 py-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9">
            <Outlet />
            {children}
          </div>
        </div>
        {children}
      </main>
      <Footer />
      <Copyright />
    </CustomerProvider>
  );
};

export default AccountLayout;
