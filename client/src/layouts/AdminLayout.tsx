import { Outlet } from "react-router-dom";
import AdminProvider from "../providers/AdminProvider";

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AdminProvider>
      <div>Admin</div>
      <div>
        <Outlet />
        {children}
      </div>
    </AdminProvider>
  );
};

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default AdminLayout;
