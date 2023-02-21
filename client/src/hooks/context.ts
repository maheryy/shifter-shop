import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserContext } from "../providers/UserProvider";
import { AdminContext } from "../providers/AdminProvider";
import { ProContext } from "../providers/ProProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useProtectedContext must be used within a UserProvider"
    );
  }
  return context;
};

export const useProContext = () => {
  const context = useContext(ProContext);
  if (context === undefined) {
    throw new Error(
      "useProtectedContext must be used within a ProProvider"
    );
  }
  return context;
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminContext must be used within a AdminProvider");
  }
  return context;
};
