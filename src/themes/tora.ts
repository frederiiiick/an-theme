import type { AnTheme } from './types';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { motion } from '../tokens/motion';
import { shadows } from '../tokens/shadows';

export const toraTheme: AnTheme = {
  id: 'tora',
  name: 'Tora',
  colors: colors.tora,
  typography: typography.tora,
  radius: radius.tora,
  motion: motion.tora,
  effects: {
    glow: true,
    glassmorphism: false,
    shadowStyle: 'soft',
  },
  shadows: shadows.tora,
};
