'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { themeConfig, Theme as ThemeType } from '@/lib/theme-config';

export type Theme = ThemeType;

const ACCENT = themeConfig.accent.default;
const ACCENT_RGB = themeConfig.accent.rgb;

function migrateTheme(stored: string | null): Theme {
  if (stored === 'loki' || stored === 'dark') return 'dark';
  if (stored === 'light') return 'light';
  return 'dark';
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accent: string;
  accentRGB: string;
  background: string;
  foreground: string;
  surface: string;
  cardBg: string;
  border: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  accent: ACCENT,
  accentRGB: ACCENT_RGB,
  ...themeConfig.colors.dark,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const next = migrateTheme(stored);
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
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const colors = themeConfig.colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent: ACCENT, accentRGB: ACCENT_RGB, ...colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);