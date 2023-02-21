import { createContext } from "react";
import { useAuthContext } from "../hooks/context";
import { Navigate } from "react-router-dom";

export const ProContext = createContext<ProContextProps>(null!);

const ProProvider = ({ children }: ProProviderProps) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // return <Navigate to="/login" replace={true} />;
  }

  return <ProContext.Provider value={{}}>{children}</ProContext.Provider>;
};

interface ProContextProps {}

interface ProProviderProps {
  children: React.ReactNode;
}

export default ProProvider;
