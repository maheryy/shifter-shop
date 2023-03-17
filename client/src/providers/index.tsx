import AuthProvider from "./AuthProvider";
import CartProvider from "./CartProvider";

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
