import { createContext } from "react";
import { useAuthContext } from "../hooks/context";
import { Navigate, useNavigate } from "react-router-dom";

export const CustomerContext = createContext<CustomerContextProps>(null!);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const { isAuthenticated, invalidate } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    invalidate();
    navigate("/");
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
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
