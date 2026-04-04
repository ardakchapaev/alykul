'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const THEMES = ['V1', 'V2'] as const;
export type ThemeId = (typeof THEMES)[number];

type ThemeContextType = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextType>({ theme: 'V1', setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('V1');

  useEffect(() => {
    const saved = localStorage.getItem('alykul-theme') as ThemeId | null;
    if (saved && THEMES.includes(saved)) setThemeState(saved);
  }, []);

  function setTheme(t: ThemeId) {
    setThemeState(t);
    localStorage.setItem('alykul-theme', t);
    document.documentElement.setAttribute('data-theme', t);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
