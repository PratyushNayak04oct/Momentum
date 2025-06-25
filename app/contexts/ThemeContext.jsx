'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context with a default value
const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
  mounted: false
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('momentum-theme');
        if (savedTheme) {
          setIsDark(savedTheme === 'dark');
        } else {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setIsDark(systemPrefersDark);
        }
      } catch (error) {
        console.warn('Error reading theme from localStorage:', error);
        setIsDark(true); // fallback to dark
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('momentum-theme', isDark ? 'dark' : 'light');
        if (document?.documentElement) {
          document.documentElement.classList.toggle('dark', isDark);
          document.documentElement.classList.toggle('light', !isDark);
        }
      } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
      }
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};