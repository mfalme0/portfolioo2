'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type Theme = 'light' | 'dark';

type TimePeriod = 'night' | 'morning' | 'midday' | 'evening';

const timeColors: Record<TimePeriod, { accent: string; accentRGB: string; label: string }> = {
  night:   { accent: '#E8A33D', accentRGB: '232,163,61', label: 'amber' },
  morning: { accent: '#E8A33D', accentRGB: '232,163,61', label: 'amber' },
  midday:  { accent: '#E8A33D', accentRGB: '232,163,61', label: 'amber' },
  evening: { accent: '#E8A33D', accentRGB: '232,163,61', label: 'amber' },
};

function getTimePeriod(): TimePeriod {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'midday';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

function migrateTheme(stored: string | null): Theme {
  if (stored === 'loki' || stored === 'dark') return 'dark';
  if (stored === 'light') return 'light';
  return 'dark';
}

const baseThemes = {
  light: {
    background: '#F5F3EE',
    foreground: '#1A1A1A',
    surface: '#FFFFFF',
    cardBg: 'rgba(232,163,61,0.04)',
    border: 'rgba(0,0,0,0.08)',
  },
  dark: {
    background: '#10151C',
    foreground: '#ECE9E1',
    surface: '#1A222C',
    cardBg: 'rgba(232,163,61,0.03)',
    border: 'rgba(236,233,225,0.06)',
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
