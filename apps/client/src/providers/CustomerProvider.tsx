import { createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";

export const CustomerContext = createContext<CustomerContextProps>(null!);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const { isAuthenticated, invalidate } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    invalidate();
    navigate("/");
  };

  if (!isAuthenticated) {
    return <Navigate replace={true} to="/login" />;
  }

  return (
    <CustomerContext.Provider
      value={{
        logout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

interface CustomerContextProps {
  logout: () => void;
}

interface CustomerProviderProps {
  children: React.ReactNode;
}

export default CustomerProvider;
