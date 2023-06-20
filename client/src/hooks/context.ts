import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { RegisterContext } from "@/providers/business/RegisterContext";
import { CustomerContext } from "@/providers/CustomerProvider";
import { DownloadContext } from "@/providers/DownloadProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a <AuthProvider>");
  }

  return context;
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);

  if (context === undefined) {
    throw new Error(
      "useCustomerContext must be used within a <CustomerProvider>",
    );
  }

  return context;
};

export const useDownloadContext = () => {
  const downloadContext = useContext(DownloadContext);

  if (downloadContext === undefined) {
    throw new Error(
      "useDownloadContext must be used within a <DownloadProvider>",
    );
  }

  return downloadContext;
};

export function useRegisterContext() {
  const registerContext = useContext(RegisterContext);

  if (!registerContext) {
    throw new Error(
      "useRegisterContext must be used within a <RegisterProvider>",
    );
  }

  return registerContext;
}
