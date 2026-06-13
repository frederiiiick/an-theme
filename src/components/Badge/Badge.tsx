import { forwardRef } from 'react';
import type { BadgeProps } from './Badge.types';
import { cn } from '../../utils/cn';

const baseStyles =
  'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-[var(--an-radius-full)] font-[family-name:var(--an-font-body)]';

const colorVarMap: Record<NonNullable<BadgeProps['color']>, string> = {
  primary: '--an-color-primary',
  secondary: '--an-color-secondary',
  accent: '--an-color-accent',
  success: '--an-color-success',
  warning: '--an-color-warning',
  danger: '--an-color-danger',
};

function getVariantStyles(
  variant: NonNullable<BadgeProps['variant']>,
  color: NonNullable<BadgeProps['color']>,
): string {
  const colorVar = colorVarMap[color];

  switch (variant) {
    case 'default':
      return `bg-[var(${colorVar})] text-white`;
    case 'outline':
      return `bg-transparent border border-[var(${colorVar})] text-[var(${colorVar})]`;
    case 'soft':
      return `bg-[var(${colorVar})]/10 text-[var(${colorVar})]`;
  }
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', color = 'primary', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(baseStyles, getVariantStyles(variant, color), className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
