import { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { useAnTheme } from './use-an-theme';
import type { AnimationPreset } from '../animations/presets';
import { resolvePreset } from '../animations/presets';

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

export function useAnimate<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { theme } = useAnTheme();

  const play = useCallback(
    (preset: AnimationPreset) => {
      if (prefersReduced || !ref.current) return;

      const config = resolvePreset(preset, theme.motion);
      return animate(ref.current, config);
    },
    [prefersReduced, theme.motion],
  );

  return { ref, play };
}
