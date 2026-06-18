'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type Theme = 'light' | 'dark';

type TimePeriod = 'night' | 'morning' | 'midday' | 'evening';

const timeColors: Record<TimePeriod, { accent: string; accentRGB: string; label: string }> = {
  night:   { accent: '#ff3b30', accentRGB: '255,59,48', label: 'red' },
  morning: { accent: '#ff453a', accentRGB: '255,69,58', label: 'red' },
  midday:  { accent: '#ff3b30', accentRGB: '255,59,48', label: 'red' },
  evening: { accent: '#dc143c', accentRGB: '220,20,60', label: 'red' },
};

function getTimePeriod(): TimePeriod {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'midday';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

function migrateTheme(stored: string | null): Theme {
  if (stored === 'loki') return 'dark';
  if (stored === 'dark') return 'light';
  if (stored === 'light') return 'light';
  return 'dark';
}

const baseThemes = {
  light: {
    background: '#fafafa',
    foreground: '#1d1d1f',
    surface: '#ffffff',
    cardBg: 'rgba(0,0,0,0.02)',
    border: 'rgba(0,0,0,0.06)',
  },
  dark: {
    background: '#1d1d1f',
    foreground: '#f5f5f7',
    surface: '#2d2d2f',
    cardBg: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.08)',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  period: TimePeriod;
  accent: string;
  accentRGB: string;
  background: string;
  foreground: string;
  surface: string;
  cardBg: string;
  border: string;
}

const now = getTimePeriod();

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  period: now,
  ...timeColors[now],
  ...baseThemes.dark,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [period, setPeriod] = useState<TimePeriod>(getTimePeriod);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const next = migrateTheme(stored);
    setTheme(next);
    localStorage.setItem('theme', next);
    setMounted(true);
    document.documentElement.style.setProperty('--color-accent', timeColors[getTimePeriod()].accent);
  }, []);

  useEffect(() => {
    const updatePeriod = () => setPeriod(getTimePeriod());
    updatePeriod();
    const timer = setInterval(updatePeriod, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.period = period;
    document.documentElement.style.setProperty('--color-accent', timeColors[period].accent);
  }, [theme, mounted, period]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const tc = timeColors[period];
  const bc = baseThemes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, period, ...tc, ...bc }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
