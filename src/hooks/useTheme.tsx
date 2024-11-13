import { useContext, createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemedContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemedContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') !== 'dark' ? 'light' : 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const removeOldTheme = theme === 'dark' ? 'light' : 'dark';

    root.classList.remove(removeOldTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemedContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemedContext.Provider>
  );
}

// Hook para usar o tema
export function useTheme() {
  const context = useContext(ThemedContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemedContextProvider');
  }
  return context;
}
