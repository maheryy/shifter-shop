import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import CustomerProvider from "../providers/CustomerProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

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
