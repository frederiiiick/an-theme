import type { AnTheme } from './types';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { motion } from '../tokens/motion';
import { shadows } from '../tokens/shadows';

export const spyTheme: AnTheme = {
  id: 'spy',
  name: 'Spy',
  colors: colors.spy,
  typography: typography.spy,
  radius: radius.spy,
  motion: motion.spy,
  effects: {
    glow: false,
    glassmorphism: true,
    shadowStyle: 'soft',
  },
  shadows: shadows.spy,
};
