import type { AnThemeMotion } from '../themes/types';

export type AnimationPreset =
  | 'fadeIn'
  | 'fadeUp'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'glowPulse'
  | 'float'
  | 'bounceIn';

interface AnimeConfig {
  [key: string]: unknown;
}

export function resolvePreset(
  preset: AnimationPreset,
  motion: AnThemeMotion,
): AnimeConfig {
  const { durationNormal, durationSlow, easing } = motion;

  const presets: Record<AnimationPreset, AnimeConfig> = {
    fadeIn: {
      opacity: [0, 1],
      duration: durationNormal,
      easing,
    },
    fadeUp: {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: durationNormal,
      easing,
    },
    fadeDown: {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: durationNormal,
      easing,
    },
    slideLeft: {
      opacity: [0, 1],
      translateX: [40, 0],
      duration: durationNormal,
      easing,
    },
    slideRight: {
      opacity: [0, 1],
      translateX: [-40, 0],
      duration: durationNormal,
      easing,
    },
    scaleIn: {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: durationNormal,
      easing,
    },
    glowPulse: {
      boxShadow: [
        '0 0 0px rgba(0,0,0,0)',
        '0 0 16px var(--an-color-primary)',
        '0 0 0px rgba(0,0,0,0)',
      ],
      duration: durationSlow * 2,
      loop: true,
      easing: 'easeInOutSine',
    },
    float: {
      translateY: [-4, 4],
      duration: durationSlow * 3,
      loop: true,
      alternate: true,
      easing: 'easeInOutSine',
    },
    bounceIn: {
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: durationSlow,
      easing: 'spring(1, 80, 10)',
    },
  };

  return presets[preset];
}
