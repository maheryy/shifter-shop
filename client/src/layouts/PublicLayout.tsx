import { Outlet } from "react-router-dom";

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <div>Public</div>
      <div>
        <Outlet />
        {children}
      </div>
    </>
  );
};

interface PublicLayoutProps {
  children?: React.ReactNode;
}

export default PublicLayout;
