export const radius = {
  tora: {
    none: '0px',
    sm: '9999px',
    md: '9999px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  spy: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
} as const;

export type RadiusKey = keyof (typeof radius)['tora'];
