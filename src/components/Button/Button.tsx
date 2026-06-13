import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { ButtonProps } from './Button.types';
import { cn } from '../../utils/cn';
import { useAnimate } from '../../hooks/use-animate';
import { injectPulseStyles, createCardPulse } from '../../providers/pulse-styles';

const colorVarMap: Record<NonNullable<ButtonProps['color']>, string> = {
  primary: '--an-color-primary',
  secondary: '--an-color-secondary',
  accent: '--an-color-accent',
  info: '--an-color-info',
  success: '--an-color-success',
  warning: '--an-color-warning',
  pink: '--an-color-pink',
};

const baseStyles =
  'inline-flex items-center justify-center font-[family-name:var(--an-font-heading)] font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--an-color-primary)] disabled:opacity-50 disabled:cursor-not-allowed rounded-full relative overflow-hidden';

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-4 text-sm gap-1.5',
  md: 'h-10 px-5 text-base gap-2',
  lg: 'h-12 px-6 text-lg gap-2.5',
};

const iconOnlySizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      iconOnly = false,
      animate: shouldAnimate = false,
      loading = false,
      className,
      children,
      disabled,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const colorVar = colorVarMap[color];
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const { ref: animRef, play } = useAnimate<HTMLButtonElement>();

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        (animRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef, animRef],
    );

    useEffect(() => {
      injectPulseStyles();
    }, []);

    useEffect(() => {
      if (shouldAnimate) play('scaleIn');
    }, [shouldAnimate, play]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading || variant === 'link' || !internalRef.current) return;
        const btn = internalRef.current;
        const resolvedColor = getComputedStyle(btn).getPropertyValue(colorVar).trim();
        createCardPulse(e.nativeEvent, btn, resolvedColor);
      },
      [disabled, loading, variant, colorVar],
    );

    const variantStyles = getVariantStyles(variant, colorVar);

    return (
      <button
        ref={setRefs}
        className={cn(
          baseStyles,
          iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
          variantStyles.className,
          loading && 'opacity-70 pointer-events-none',
          className,
        )}
        style={{ ...variantStyles.style, ...style }}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {!iconOnly && <span>{children}</span>}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

function getVariantStyles(
  variant: NonNullable<ButtonProps['variant']>,
  colorVar: string,
): { className: string; style: React.CSSProperties } {
  switch (variant) {
    case 'solid':
      return {
        className: 'text-white hover:brightness-110 active:brightness-95 shadow-[var(--an-shadow-sm)]',
        style: { backgroundColor: `var(${colorVar})` },
      };
    case 'outline':
      return {
        className: 'bg-transparent border-2 hover:brightness-110 active:brightness-95',
        style: { borderColor: `var(${colorVar})`, color: `var(${colorVar})` },
      };
    case 'ghost':
      return {
        className: 'bg-transparent hover:bg-[var(--an-color-surface-alt)] active:brightness-95',
        style: { color: `var(${colorVar})` },
      };
    case 'link':
      return {
        className: 'bg-transparent underline-offset-2 hover:underline active:brightness-95 rounded-none h-auto px-0',
        style: { color: `var(${colorVar})` },
      };
  }
}
