import { useEffect, forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { cn } from '../../utils/cn';
import { useAnimate } from '../../hooks/use-animate';

const baseStyles =
  'inline-flex items-center justify-center font-[family-name:var(--an-font-body)] font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--an-color-primary)] disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[var(--an-color-primary)] text-white hover:brightness-110 active:brightness-95 shadow-[var(--an-shadow-sm)]',
  secondary:
    'bg-[var(--an-color-secondary)] text-white hover:brightness-110 active:brightness-95 shadow-[var(--an-shadow-sm)]',
  ghost:
    'bg-transparent text-[var(--an-color-text)] hover:bg-[var(--an-color-surface-alt)]',
  outline:
    'bg-transparent border-2 border-[var(--an-color-border)] text-[var(--an-color-text)] hover:border-[var(--an-color-primary)] hover:text-[var(--an-color-primary)]',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-sm rounded-[var(--an-radius-sm)]',
  md: 'h-10 px-4 text-base rounded-[var(--an-radius-md)]',
  lg: 'h-12 px-6 text-lg rounded-[var(--an-radius-lg)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      animate: shouldAnimate = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    forwardedRef,
  ) => {
    const { ref: animRef, play } = useAnimate<HTMLButtonElement>();

    useEffect(() => {
      if (shouldAnimate) {
        play('scaleIn');
      }
    }, [shouldAnimate, play]);

    return (
      <button
        ref={(node) => {
          (animRef as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          loading && 'opacity-70 pointer-events-none',
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
