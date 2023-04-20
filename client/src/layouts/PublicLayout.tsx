import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

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
