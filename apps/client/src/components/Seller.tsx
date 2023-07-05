import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";
import { UserRoles } from "@/types/user";

interface SellerProps {
  children: React.ReactNode;
}

function Seller({ children }: SellerProps) {
  const { user } = useAuthContext();

  const isAuthorized = user?.role === UserRoles.enum.SELLER;

  if (!isAuthorized) {
    return <Navigate replace to="/404" />;
  }

  if (!children) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
}

export default Seller;
