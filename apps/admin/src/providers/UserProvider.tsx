import { createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";

export const UserContext = createContext<UserContextProps>(null!);

const UserProvider = ({ children }: UserProviderProps) => {
    const { isAuthenticated, invalidate } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        invalidate();
        navigate("/login");
    };

    if (!isAuthenticated) {
        return <Navigate replace={true} to="/login" />;
    }

    return <UserContext.Provider
        value={{
            logout
        }}
    >
        {children}
    </UserContext.Provider>;
};

interface UserContextProps {
    logout: () => void;
}

interface UserProviderProps {
    children: React.ReactNode;
}

export default UserProvider;
