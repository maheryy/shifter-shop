import { Outlet } from "react-router-dom";
import UserProvider from "../providers/UserProvider";

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <UserProvider>
      <div>User</div>
      <div>
        <Outlet />
        {children}
      </div>
    </UserProvider>
  );
};

interface UserLayoutProps {
  children?: React.ReactNode;
}

export default UserLayout;
