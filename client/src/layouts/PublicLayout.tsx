import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        {children}
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

interface PublicLayoutProps {
  children?: ReactNode;
}

export default PublicLayout;
