import { createContext, useState, useContext } from 'react';
import requestLogin from "../API/services/login.js";
import apiClient from "../API/http.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            const { username, password } = userData;
            userData.jwt = await requestLogin(username, password)
            apiClient.defaults.headers['Authorization'] = `Bearer ${userData.jwt}`;

            setUser(userData);
        } catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        setUser(null);
        delete apiClient.defaults.headers['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};
