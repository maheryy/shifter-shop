import { createContext } from "react";
import { useAuthContext } from "../hooks/context";
import { Navigate } from "react-router-dom";

export const CustomerContext = createContext<CustomerContextProps>(null!);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <CustomerContext.Provider value={{}}>{children}</CustomerContext.Provider>
  );
};

interface CustomerContextProps {}

interface CustomerProviderProps {
  children: React.ReactNode;
}

export default CustomerProvider;
