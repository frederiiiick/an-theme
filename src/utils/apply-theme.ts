import type { AnTheme } from '../themes/types';

export function applyTheme(element: HTMLElement, theme: AnTheme): void {
  const { colors, typography, radius, motion, shadows } = theme;

  element.setAttribute('data-an-theme', theme.id);

  element.style.setProperty('--an-color-primary', colors.primary);
  element.style.setProperty('--an-color-secondary', colors.secondary);
  element.style.setProperty('--an-color-accent', colors.accent);
  element.style.setProperty('--an-color-bg', colors.background);
  element.style.setProperty('--an-color-surface', colors.surface);
  element.style.setProperty('--an-color-surface-alt', colors.surfaceAlt);
  element.style.setProperty('--an-color-text', colors.text);
  element.style.setProperty('--an-color-text-muted', colors.textMuted);
  element.style.setProperty('--an-color-border', colors.border);
  element.style.setProperty('--an-color-info', colors.info);
  element.style.setProperty('--an-color-success', colors.success);
  element.style.setProperty('--an-color-warning', colors.warning);
  element.style.setProperty('--an-color-danger', colors.danger);
  element.style.setProperty('--an-color-pink', colors.pink);
  element.style.setProperty('--an-color-cream', colors.cream);

  element.style.setProperty('--an-font-heading', typography.fontHeading);
  element.style.setProperty('--an-font-body', typography.fontBody);
  element.style.setProperty('--an-font-display', typography.fontDisplay);

  element.style.setProperty('--an-radius-none', radius.none);
  element.style.setProperty('--an-radius-sm', radius.sm);
  element.style.setProperty('--an-radius-md', radius.md);
  element.style.setProperty('--an-radius-lg', radius.lg);
  element.style.setProperty('--an-radius-xl', radius.xl);
  element.style.setProperty('--an-radius-full', radius.full);

  element.style.setProperty('--an-duration-fast', `${motion.durationFast}ms`);
  element.style.setProperty(
    '--an-duration-normal',
    `${motion.durationNormal}ms`,
  );
  element.style.setProperty('--an-duration-slow', `${motion.durationSlow}ms`);
  element.style.setProperty('--an-easing', motion.easingCss);

  element.style.setProperty('--an-shadow-sm', shadows.sm);
  element.style.setProperty('--an-shadow-md', shadows.md);
  element.style.setProperty('--an-shadow-lg', shadows.lg);
  element.style.setProperty('--an-shadow-glow', shadows.glow);
}
