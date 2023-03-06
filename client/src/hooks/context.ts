import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { CustomerContext } from "../providers/CustomerProvider";
import { AdminContext } from "../providers/AdminProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
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
