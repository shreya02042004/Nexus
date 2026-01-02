import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Check localStorage or default to 'dark'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('nexus-theme') || 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('nexus-theme', theme);

        // TODO: Sync to backend when endpoint is available
        // api.put('/users/profile', { theme });
    }, [theme]);

    const value = {
        theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
