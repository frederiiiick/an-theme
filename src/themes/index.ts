export type {
  AnTheme,
  AnThemeColors,
  AnThemeTypography,
  AnThemeRadius,
  AnThemeMotion,
  AnThemeEffects,
  AnThemeShadows,
  ThemeId,
} from './types';
export { toraTheme } from './tora';
export { spyTheme } from './spy';

import type { AnTheme, ThemeId } from './types';
import { toraTheme } from './tora';
import { spyTheme } from './spy';

export const themes: Record<ThemeId, AnTheme> = {
  tora: toraTheme,
  spy: spyTheme,
};
