import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getSavedUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getSavedUser);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken") || null
    );

    const login = (userData, token = null) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        if (token) {
            localStorage.setItem("accessToken", token);
        }

        setUser(userData);
        setAccessToken(token);
    };

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");

        setUser(null);
        setAccessToken(null);
    };

    const updateUser = (userData) => {
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                login,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
