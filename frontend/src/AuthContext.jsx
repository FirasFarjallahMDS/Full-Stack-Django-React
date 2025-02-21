import { createContext, useState } from "react";
import { login } from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (username, password) => {
            try {
                const response = await login(username, password);
                if (response?.access) {
                    setUser({ username });
                    return true; // Indicate successful login
                }
                return false;
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                alert(error.response?.data?.detail || "Login failed!");
                return false;
            }
        };
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
