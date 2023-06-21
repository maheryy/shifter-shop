import { createContext, useEffect, useState } from "react";
import { getUser } from "@/api/user.api";
import useComponentUpdate from "@/hooks/componentUpdate";
import useCartSynchronization from "@/hooks/useCartSynchronization";
import StorageKey from "@/types/storage";
import { User } from "@/types/user";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/storage";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  authenticate: (user: User, token: string) => void;
  invalidate: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useCartSynchronization(isAuthenticated);

  useEffect(() => {
    const localToken = getFromLocalStorage<string>(StorageKey.enum.token);

    if (!localToken) {
      return setIsLoading(false);
    }

    getUser(localToken)
      .then((user) => authenticate(user, localToken))
      .catch((e: unknown) => {
        invalidate();
        console.error((e as Error).message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useComponentUpdate(() => {
    if (token) {
      setToLocalStorage(StorageKey.enum.token, token);
    } else {
      removeFromLocalStorage(StorageKey.enum.token);
    }
  }, [token]);

  const authenticate = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const invalidate = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authenticate,
        invalidate,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
