import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import UserProvider from "../providers/UserProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <UserProvider>
      <Header />
      <main>
        <Outlet />
        {children}
      </main>
      <Footer />
      <Copyright />
    </UserProvider>
  );
};

interface UserLayoutProps {
  children?: ReactNode;
}

export default UserLayout;
