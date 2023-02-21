import { createContext } from "react";
import { useAuthContext } from "../hooks/context";
import { Navigate } from "react-router-dom";

export const UserContext = createContext<UserContextProps>(null!);

const UserProvider = ({ children }: UserProviderProps) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // return <Navigate to="/login" replace={true} />;
  }

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

interface UserContextProps {}

interface UserProviderProps {
  children: React.ReactNode;
}

export default UserProvider;
