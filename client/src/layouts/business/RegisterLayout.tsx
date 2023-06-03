import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/business/register/Header";
import Steps from "@/components/business/register/Steps";
import Copyright from "@/components/Copyright";
import RegisterProvider from "@/providers/business/RegisterContext";

interface RegisterLayoutProps {
  children?: ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <RegisterProvider>
      <Header />
      <Steps />
      <main>
        <Outlet />
        {children}
      </main>
      <Copyright />
    </RegisterProvider>
  );
};

export default RegisterLayout;
