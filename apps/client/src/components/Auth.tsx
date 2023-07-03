import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";

interface AuthProps {
  children: React.ReactNode;
}

function Auth({ children }: AuthProps) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { state: { redirectTo: location.pathname } });
  }

  return <Fragment>{children}</Fragment>;
}

export default Auth;
