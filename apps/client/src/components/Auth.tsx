import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";

interface AuthProps {
  children: React.ReactNode;
}

function Auth({ children }: AuthProps) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate state={{ redirectTo: location.pathname }} to="/login" />;
  }

  if (!children) {
    return null;
  }

  return children;
}

export default Auth;
