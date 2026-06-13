import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface AnimateOnViewConfig {
  [key: string]: unknown;
}

export interface UseAnimateOnViewOptions {
  selector: string;
  animationConfig: AnimateOnViewConfig;
  threshold?: number;
  once?: boolean;
}

export function useAnimateOnView<T extends HTMLElement = HTMLElement>(
  options: UseAnimateOnViewOptions,
  enabled: boolean = true,
) {
  const ref = useRef<T>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!enabled || hasAnimated) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setHasAnimated(true);
      return;
    }

    const container = ref.current;
    if (!container) return;

    const { selector, animationConfig, threshold = 0.2, once = true } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const targets = container.querySelectorAll(selector);
            if (targets.length > 0) {
              animate(targets, animationConfig);
            }
            if (once) {
              observer.disconnect();
              setHasAnimated(true);
            }
          }
        }
      },
      { threshold },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [enabled, hasAnimated, options]);

  return { ref, hasAnimated };
}
