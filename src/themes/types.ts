export interface AnThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  info: string;
  success: string;
  warning: string;
  danger: string;
  pink: string;
  cream: string;
}

export interface AnThemeTypography {
  fontHeading: string;
  fontBody: string;
  fontDisplay: string;
  fontImportUrl: string;
}

export interface AnThemeRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface AnThemeMotion {
  durationFast: number;
  durationNormal: number;
  durationSlow: number;
  easing: string;
  easingCss: string;
}

export interface AnThemeEffects {
  glow: boolean;
  glassmorphism: boolean;
  shadowStyle: 'soft' | 'hard' | 'none';
}

export interface AnThemeShadows {
  sm: string;
  md: string;
  lg: string;
  glow: string;
}

export interface AnTheme {
  id: string;
  name: string;
  colors: AnThemeColors;
  typography: AnThemeTypography;
  radius: AnThemeRadius;
  motion: AnThemeMotion;
  effects: AnThemeEffects;
  shadows: AnThemeShadows;
}

export type ThemeId = 'tora' | 'spy';
