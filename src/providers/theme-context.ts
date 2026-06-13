import { createContext } from 'react';
import type { AnTheme, ThemeId } from '../themes/types';
import { toraTheme } from '../themes/tora';

export interface AnThemeContextValue {
  theme: AnTheme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

export const AnThemeContext = createContext<AnThemeContextValue>({
  theme: toraTheme,
  themeId: 'tora',
  setTheme: () => {},
});
