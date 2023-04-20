import { useContext } from "react";
import { LayoutContext } from "@/providers/LayoutProvider";

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};
