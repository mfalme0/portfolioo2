export const themeConfig = {
  themes: {
    daylight: {
      accent: '#D02020',
      accentRGB: '208 32 32',
      accentSecondary: '#1040C0',
      colors: {
        background: '#F0F0F0',
        foreground: '#121212',
        surface: '#FFFFFF',
        cardBg: '#FFFFFF',
        border: '#121212',
      },
      cssVars: {
        '--paper': '#F0F0F0',
        '--sheet': '#FFFFFF',
        '--sheet-2': '#E0E0E0',
        '--ink': '#121212',
        '--flag': '#D02020',
        '--bush': '#1040C0',
        '--water': '#F0C020',
        '--gravel': '#4A4A4A',
        '--rule': '#121212',
        '--rule-strong': '#121212',
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
