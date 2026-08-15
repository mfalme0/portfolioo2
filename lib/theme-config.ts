export const themeConfig = {
  themes: {
    daylight: {
      accent: '#D9481C',
      accentRGB: '217 72 28',
      accentSecondary: '#0F6B78',
      colors: {
        background: '#F2EEE1',
        foreground: '#0C1D23',
        surface: '#FBF9F1',
        cardBg: 'rgba(217,72,28,0.04)',
        border: 'rgba(12,29,35,0.14)',
      },
      cssVars: {
        '--paper': '#F2EEE1',
        '--sheet': '#FBF9F1',
        '--sheet-2': '#EAE4D1',
        '--ink': '#0C1D23',
        '--flag': '#D9481C',
        '--bush': '#5F7A1F',
        '--water': '#0F6B78',
        '--gravel': '#6B6657',
        '--rule': '#D8D1BC',
        '--rule-strong': '#B6AE96',
      },
    },
    night: {
      accent: '#FF6B38',
      accentRGB: '255 107 56',
      accentSecondary: '#3FB8C7',
      colors: {
        background: '#0E1718',
        foreground: '#E7E4D6',
        surface: '#162023',
        cardBg: 'rgba(255,107,56,0.04)',
        border: 'rgba(231,228,214,0.10)',
      },
      cssVars: {
        '--paper': '#0E1718',
        '--sheet': '#162023',
        '--sheet-2': '#1D2A2D',
        '--ink': '#E7E4D6',
        '--flag': '#FF6B38',
        '--bush': '#A8C93F',
        '--water': '#3FB8C7',
        '--gravel': '#96A29E',
        '--rule': '#26343A',
        '--rule-strong': '#3A4A50',
      },
    },
  },
  palettes: {
    homelab: {
      bg: '#F2EEE1',
      panel: '#FBF9F1',
      border: '#D8D1BC',
      textPrimary: '#0C1D23',
      textSecondary: '#6B6657',
      accentPrimary: '#D9481C',
      accentSecondary: '#0F6B78',
    },
    gear: {
      bg: '#F2EEE1',
      panel: '#FBF9F1',
      border: '#D8D1BC',
      textPrimary: '#0C1D23',
      textSecondary: '#6B6657',
      accentPrimary: '#D9481C',
      accentSecondary: '#0F6B78',
      statusActive: '#5F7A1F',
      statusRetired: '#B6AE96',
    },
  },
} as const;

export type Theme = 'daylight' | 'night';
export type Palette = 'default' | 'homelab' | 'gear';
