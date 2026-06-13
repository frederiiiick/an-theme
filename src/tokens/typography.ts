export const typography = {
  tora: {
    fontHeading: "'Quicksand', sans-serif",
    fontBody: "'Nunito', sans-serif",
    fontDisplay: "'Quicksand', sans-serif",
    fontImportUrl:
      'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap',
  },
  spy: {
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontDisplay: "'Space Grotesk', sans-serif",
    fontImportUrl:
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
  },
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
} as const;

export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontSizeKey = keyof typeof fontSizes;
export type FontWeightKey = keyof typeof fontWeights;
