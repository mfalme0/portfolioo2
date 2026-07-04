export const themeConfig = {
  themes: {
    dark: {
      accent: '#E8A33D',
      accentRGB: '232 163 61',
      accentSecondary: '#C2542C',
      colors: {
        background: '#10151C',
        foreground: '#ECE9E1',
        surface: '#1A222C',
        cardBg: 'rgba(232,163,61,0.03)',
        border: 'rgba(236,233,225,0.06)',
      },
      cssVars: {
        '--ink': '#10151C',
        '--surface': '#1A222C',
        '--slate': '#2B3640',
        '--bone': '#ECE9E1',
        '--amber': '#E8A33D',
        '--clay': '#C2542C',
        '--muted': '#9BA3B0',
      },
    },
    light: {
      accent: '#D4902F',
      accentRGB: '212 144 47',
      accentSecondary: '#B84828',
      colors: {
        background: '#F5F3EE',
        foreground: '#1A1A1A',
        surface: '#FFFFFF',
        cardBg: 'rgba(232,163,61,0.04)',
        border: 'rgba(0,0,0,0.08)',
      },
      cssVars: {
        '--ink': '#F5F3EE',
        '--surface': '#FFFFFF',
        '--slate': '#D4CFC5',
        '--bone': '#1A1A1A',
        '--amber': '#D4902F',
        '--clay': '#B84828',
        '--muted': '#8A857D',
      },
    },
    synth: {
      accent: '#FF0080',
      accentRGB: '255 0 128',
      accentSecondary: '#00DFD6',
      colors: {
        background: '#0A0A16',
        foreground: '#E8E8F0',
        surface: '#121220',
        cardBg: 'rgba(255,0,128,0.04)',
        border: 'rgba(232,232,240,0.06)',
      },
      cssVars: {
        '--ink': '#0A0A16',
        '--surface': '#121220',
        '--slate': '#252040',
        '--bone': '#E8E8F0',
        '--amber': '#FF0080',
        '--clay': '#00DFD6',
        '--muted': '#8888BB',
      },
    },
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

export type Theme = 'dark' | 'light' | 'synth';
export type Palette = 'default' | 'homelab' | 'gear';
