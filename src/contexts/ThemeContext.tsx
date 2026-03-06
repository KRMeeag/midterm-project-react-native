import React, { createContext, useState, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    subtext: string;
    card: string;
    primary: string;
    secondary: string;
    border: string;
    header: string;
    accent: string;
    warning: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Palette: 
  // Charcoal Blue: #264653
  // Verdigris: #2A9D8F
  // Tuscan Sun: #E9C46A
  // Sandy Brown: #F4A261
  // Burnt Peach: #E76F51

  const colors = theme === 'light' 
    ? { 
        background: '#f2f2f2', 
        text: '#264653',
        subtext: '#888',
        card: '#ffffff', 
        primary: '#2A9D8F', 
        secondary: '#264653',
        border: '#e0e0e0',
        header: '#264653',
        accent: '#E76F51',
        warning: '#E9C46A'
      }
    : { 
        background: '#1a1a1a', 
        text: '#ffffff', 
        subtext: '#d8d7d7',
        card: '#264653', 
        primary: '#2A9D8F', 
        secondary: '#40768b',
        border: '#043731',
        header: '#12232a',
        accent: '#F4A261',
        warning: '#E9C46A'
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};