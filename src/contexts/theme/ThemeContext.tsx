import React, { createContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [ theme ]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  );
};
