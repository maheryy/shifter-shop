import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomerProvider from "@/providers/CustomerProvider";

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <CustomerProvider>
      <Header />
      <main>
        <Outlet />
        {children}
      </main>
      <Footer />
      <Copyright />
    </CustomerProvider>
  );
};

interface CustomerLayoutProps {
  children?: ReactNode;
}

export default CustomerLayout;
