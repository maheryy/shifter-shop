import AuthProvider from "@/providers/AuthProvider";
import CartProvider from "@/providers/CartProvider";

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

interface ProvidersProps {
  children: React.ReactNode;
}

export default Providers;
