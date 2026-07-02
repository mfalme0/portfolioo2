export const themeConfig = {
  colors: {
    dark: {
      background: '#10151C',
      foreground: '#ECE9E1',
      surface: '#1A222C',
      cardBg: 'rgba(232,163,61,0.03)',
      border: 'rgba(236,233,225,0.06)',
    },
    light: {
      background: '#F5F3EE',
      foreground: '#1A1A1A',
      surface: '#FFFFFF',
      cardBg: 'rgba(232,163,61,0.04)',
      border: 'rgba(0,0,0,0.08)',
    },
  },
  accent: {
    default: '#E8A33D',
    secondary: '#C2542C',
    rgb: '232 163 61',
  },
  palettes: {
    homelab: {
      bg: '#07080A',
      panel: '#0D0F13',
      border: '#1A1D24',
      textPrimary: '#E8E8ED',
      textSecondary: '#6B7280',
      accentPrimary: '#EF4444',
      accentSecondary: '#22D3EE',
    },
    gear: {
      bg: '#0A0A0E',
      panel: '#14141A',
      border: '#2A2A33',
      textPrimary: '#E8E8ED',
      textSecondary: '#8A8A95',
      accentPrimary: '#FF003C',
      accentSecondary: '#1AE5C9',
      statusActive: '#39FF6A',
      statusRetired: '#5C5C66',
    },
  },
} as const;

export type Theme = 'light' | 'dark';
export type Palette = 'default' | 'homelab' | 'gear';