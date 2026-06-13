import {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import { AnThemeContext } from './theme-context';
import type { ThemeId } from '../themes/types';
import { themes } from '../themes';
import { applyTheme } from '../utils/apply-theme';

export interface AnThemeProviderProps {
  theme?: ThemeId;
  children: ReactNode;
}

const FONT_LINK_ID = 'an-theme-fonts';

function injectFontLink(url: string): void {
  const existing = document.getElementById(FONT_LINK_ID);
  if (existing) {
    existing.setAttribute('href', url);
    return;
  }

  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

export function AnThemeProvider({
  theme: initialTheme = 'tora',
  children,
}: AnThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(initialTheme);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes[themeId];

  useLayoutEffect(() => {
    if (containerRef.current) {
      applyTheme(containerRef.current, currentTheme);
    }
    injectFontLink(currentTheme.typography.fontImportUrl);
  }, [currentTheme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
  }, []);

  return (
    <AnThemeContext.Provider value={{ theme: currentTheme, themeId, setTheme }}>
      <div
        ref={containerRef}
        data-an-theme={themeId}
        style={{
          fontFamily: currentTheme.typography.fontBody,
          color: currentTheme.colors.text,
        }}
      >
        {children}
      </div>
    </AnThemeContext.Provider>
  );
}
