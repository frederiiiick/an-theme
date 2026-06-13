import { useContext } from 'react';
import { AnThemeContext } from '../providers/theme-context';
import type { AnThemeContextValue } from '../providers/theme-context';

export function useAnTheme(): AnThemeContextValue {
  const context = useContext(AnThemeContext);
  if (!context) {
    throw new Error('useAnTheme must be used within an AnThemeProvider');
  }
  return context;
}
