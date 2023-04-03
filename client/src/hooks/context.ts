import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { CustomerContext } from "../providers/CustomerProvider";
import { CartContext } from "../providers/CartProvider";
import { DownloadContext } from "../providers/DownloadProvider";

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

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const useDownloadContext = () => {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error(
      "useDownloadContext must be used within a DownloadProvider"
    );
  }
  return context;
};
