import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import LayoutProvider from "@/providers/LayoutProvider";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <LayoutProvider>
        <main>
          <Outlet />
          {children}
        </main>
    </LayoutProvider>
  );
};

interface AuthLayoutProps {
  children?: ReactNode;
}

export default AuthLayout;
