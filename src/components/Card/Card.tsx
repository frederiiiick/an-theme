import { forwardRef } from 'react';
import type { CardProps } from './Card.types';
import { cn } from '../../utils/cn';

const baseStyles =
  'rounded-[var(--an-radius-lg)] p-6 font-[family-name:var(--an-font-body)] text-[var(--an-color-text)]';

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default:
    'bg-[var(--an-color-surface)] border border-[var(--an-color-border)]',
  glass:
    'bg-[var(--an-color-surface)]/80 backdrop-blur-md border border-[var(--an-color-border)]/50',
  elevated:
    'bg-[var(--an-color-surface)] shadow-[var(--an-shadow-md)]',
};

const hoverStyles =
  'transition-all duration-[var(--an-duration-normal)] cursor-pointer hover:shadow-[var(--an-shadow-lg)] hover:-translate-y-0.5';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', hoverable = false, className, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hoverable && hoverStyles,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
