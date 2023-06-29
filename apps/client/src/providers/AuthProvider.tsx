import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useState } from "react";
import { profile } from "@/api/auth.api";
import useCartSynchronization from "@/hooks/useCartSynchronization";
import useStoredState from "@/hooks/useStoredState";
import { Auth } from "@/types/auth";
import QueryKey from "@/types/query";
import StorageKey from "@/types/storage";
import { User } from "@/types/user";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  authenticate: (payload: Auth) => void;
  invalidate: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const [token, setToken] = useStoredState<string | null>(
    StorageKey.enum.token,
    null,
  );

  useCartSynchronization(isAuthenticated);

  const authenticate = useCallback(
    ({ token, user }: Auth) => {
      setToken(token);
      setUser(user);
    },
    [setToken],
  );

  const invalidate = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken]);

  const { isLoading } = useQuery({
    queryFn: profile,
    queryKey: [QueryKey.enum.user, token],
    onSuccess: (data) => {
      setUser(data);
    },
    onError: invalidate,
    enabled: !!token,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authenticate,
        invalidate,
      }}
    >
      {token && isLoading ? null : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
