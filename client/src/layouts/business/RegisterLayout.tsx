import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/business/register/Header";
import Copyright from "@/components/Copyright";
import RegisterProvider from "@/providers/business/RegisterContext";
import Steps from "@/components/business/register/Steps";

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
