import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";

interface Auth {
  children?: React.ReactNode;
}

function Auth({ children }: Auth) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate replace state={{ redirectTo: location.pathname }} to="/login" />
    );
  }

  return children;
}

export default Auth;
