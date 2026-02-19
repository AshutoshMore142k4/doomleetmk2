import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'mono' | 'purple';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'mono', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('doomleet-theme') as Theme) || 'mono';
    }
    return 'mono';
  });

  useEffect(() => {
    localStorage.setItem('doomleet-theme', theme);
    document.documentElement.classList.toggle('theme-purple', theme === 'purple');
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'mono' ? 'purple' : 'mono'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
