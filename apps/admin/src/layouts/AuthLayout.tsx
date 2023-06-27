import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main>
      <Outlet />
      {children}
    </main>
  );
};

interface AuthLayoutProps {
  children?: ReactNode;
}

export default AuthLayout;
