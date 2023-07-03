import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { RegisterContext } from "@/providers/business/RegisterContext";
import { DownloadContext } from "@/providers/DownloadProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a <AuthProvider>");
  }

  return context;
};

export const useDownloadContext = () => {
  const downloadContext = useContext(DownloadContext);

  if (!downloadContext) {
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
