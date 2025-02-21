import { createContext, useState, ReactNode } from 'react';

type ThemeType = {
  isDarkMode: boolean;
  toggleTheme: (isDarkMode: boolean) => void;
};

type LoadingErrorProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeType | null>(null);

export const ThemeProvider = ({ children }: LoadingErrorProviderProps) => {
  const [isDarkMode, setMode] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme: setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
