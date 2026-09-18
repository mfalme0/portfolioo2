'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { themeConfig, Theme as ThemeType } from '@/lib/theme-config';

export type Theme = ThemeType;

const themeKeys: Theme[] = ['daylight'];

function migrateTheme(): Theme {
  return 'daylight';
}

const defaultTheme = migrateTheme();
const defaultColors = themeConfig.themes[defaultTheme];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accent: string;
  accentRGB: string;
  accentSecondary: string;
  background: string;
  foreground: string;
  surface: string;
  cardBg: string;
  border: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {},
  ...defaultColors,
  ...defaultColors.colors,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const next = migrateTheme();
    setTheme(next);
    localStorage.setItem('theme', next);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(themeKeys[0]);
  }, []);

  const t = themeConfig.themes[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        accent: t.accent,
        accentRGB: t.accentRGB,
        accentSecondary: t.accentSecondary,
        ...t.colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
