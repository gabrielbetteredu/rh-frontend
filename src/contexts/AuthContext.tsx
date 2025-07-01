import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axios from "../lib/axios";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AuthProvider: Setting up mock authentication...");

        // For frontend-only mode, automatically set a demo user
        const demoUser = {
            id: "demo-user-id",
            email: "admin@example.com",
            name: "Demo Admin",
            role: "admin",
        };

        // Set demo token in localStorage
        localStorage.setItem("token", "demo-jwt-token-frontend-only");
        setUser(demoUser);
        console.log("AuthProvider: Demo user set:", demoUser);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await axios.post("/auth/login", {
                email,
                password,
            });
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            setUser(user);
            return true;
        } catch (error: any) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        console.log("Mock logout completed");
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
