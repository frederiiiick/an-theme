export const shadows = {
  tora: {
    sm: '0 2px 4px rgb(253 148 80 / 0.08)',
    md: '0 4px 12px rgb(253 148 80 / 0.12)',
    lg: '0 8px 24px rgb(253 148 80 / 0.16)',
    glow: '0 0 16px rgb(253 148 80 / 0.3)',
  },
  spy: {
    sm: '0 2px 4px rgb(87 103 92 / 0.06)',
    md: '0 4px 12px rgb(87 103 92 / 0.1)',
    lg: '0 8px 24px rgb(87 103 92 / 0.14)',
    glow: '0 0 16px rgb(87 103 92 / 0.2)',
  },
} as const;

export type ShadowKey = keyof (typeof shadows)['tora'];
