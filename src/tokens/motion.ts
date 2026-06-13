export const motion = {
  tora: {
    durationFast: 150,
    durationNormal: 300,
    durationSlow: 500,
    easing: 'spring(1, 80, 10)',
    easingCss: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  spy: {
    durationFast: 150,
    durationNormal: 250,
    durationSlow: 400,
    easing: 'cubicBezier(.4, 0, .2, 1)',
    easingCss: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
