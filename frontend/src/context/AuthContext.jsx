import { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await API.post('/auth/register', { name, email, password });
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
