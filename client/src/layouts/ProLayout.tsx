import { Outlet } from "react-router-dom";
import ProProvider from "../providers/ProProvider";

const ProLayout = ({ children }: ProLayoutProps) => {
  return (
    <ProProvider>
      <div>Pro</div>
      <div>
        <Outlet />
        {children}
      </div>
    </ProProvider>
  );
};

interface ProLayoutProps {
  children?: React.ReactNode;
}

export default ProLayout;
