import AuthProvider from "@/providers/AuthProvider";

const Providers = ({ children }: ProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

interface ProvidersProps {
  children: React.ReactNode;
}

export default Providers;
