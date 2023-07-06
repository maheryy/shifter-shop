import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";
import { profile } from "@/api/auth.api";
import useCartSynchronization from "@/hooks/useCartSynchronization";
import useStoredState from "@/hooks/useStoredState";
import { Auth } from "@/types/auth";
import QueryKey from "@/types/query";
import StorageKey from "@/types/storage";
import { User } from "@/types/user";

interface AuthContextProps {
  user?: User;
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (payload: Auth) => void;
  invalidate: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [token, setToken] = useStoredState<string | null>(
    StorageKey.enum.token,
    null,
  );

  function authenticate({ token, user }: Auth) {
    setToken(token);

    queryClient.setQueryData([QueryKey.enum.user, token], user);
  }

  function invalidate() {
    setToken(null);

    queryClient.invalidateQueries([QueryKey.enum.user, token]);
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: profile,
    queryKey: [QueryKey.enum.user, token],
    onError: invalidate,
    enabled: !!token,
  });

  const isAuthenticated = !!data;

  useCartSynchronization(isAuthenticated);

  if (token && isLoading) {
    return null;
  }

  if (isError) {
    invalidate();
  }

  return (
    <AuthContext.Provider
      value={{
        user: data,
        token,
        isAuthenticated,
        authenticate,
        invalidate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
