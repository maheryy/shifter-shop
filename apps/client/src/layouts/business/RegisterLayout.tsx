import { Outlet } from "react-router-dom";
import Steps from "@/components/business/register/Steps";
import RegisterProvider from "@/providers/business/RegisterContext";

function RegisterLayout() {
  return (
    <RegisterProvider>
      <Steps />
      <Outlet />
    </RegisterProvider>
  );
}

export default RegisterLayout;
