import { useEffect } from "react";
import { createContext } from "react";
import { useAuthContext } from "../hooks/context";
import { Navigate } from "react-router-dom";

export const AdminContext = createContext<AdminContextProps>(null!);

const AdminProvider = ({ children }: AdminProviderProps) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // return <Navigate to="/login" replace={true} />;
  }

  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};

interface AdminContextProps {}

interface AdminProviderProps {
  children: React.ReactNode;
}

export default AdminProvider;
