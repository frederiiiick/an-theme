import { forwardRef, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { X } from 'lucide-react';
import type { BadgeProps } from './Badge.types';
import { cn } from '../../utils/cn';

const colorVarMap: Record<NonNullable<BadgeProps['color']>, string> = {
  primary: '--an-color-primary',
  secondary: '--an-color-secondary',
  accent: '--an-color-accent',
  info: '--an-color-info',
  success: '--an-color-success',
  warning: '--an-color-warning',
  pink: '--an-color-pink',
};

const baseStyles =
  'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-[var(--an-radius-full)] font-[family-name:var(--an-font-body)] transition-colors w-fit';

function getVariantStyles(
  variant: NonNullable<BadgeProps['variant']>,
  colorVar: string,
): { className: string; style: React.CSSProperties } {
  switch (variant) {
    case 'solid':
      return {
        className: 'text-white',
        style: { backgroundColor: `var(${colorVar})` },
      };
    case 'outline':
      return {
        className: 'bg-transparent border',
        style: { borderColor: `var(${colorVar})`, color: `var(${colorVar})` },
      };
    case 'soft':
      return {
        className: 'relative overflow-hidden',
        style: { color: `var(${colorVar})` },
      };
    case 'dot':
      return {
        className: 'bg-[var(--an-color-surface)] text-[var(--an-color-text)]',
        style: {},
      };
  }
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      leftIcon,
      rightIcon,
      removable = false,
      onRemove,
      animate: shouldAnimate = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const colorVar = colorVarMap[color];
    const variantResult = getVariantStyles(variant, colorVar);
    const internalRef = useRef<HTMLSpanElement | null>(null);
    const hasAnimated = useRef(false);

    const setRefs = (node: HTMLSpanElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (!shouldAnimate || hasAnimated.current || !internalRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        hasAnimated.current = true;
        return;
      }

      hasAnimated.current = true;
      animate(internalRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 400,
        ease: 'outQuad',
      });
    }, [shouldAnimate]);

    return (
      <span
        ref={setRefs}
        className={cn(baseStyles, variantResult.className, className)}
        style={{
          ...variantResult.style,
          ...(shouldAnimate && !hasAnimated.current ? { opacity: 0, transform: 'scale(0.8)' } : {}),
          ...style,
        }}
        {...props}
      >
        {variant === 'soft' && (
          <span
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{ backgroundColor: `var(${colorVar})`, opacity: 0.12 }}
          />
        )}
        {variant === 'dot' && (
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: `var(${colorVar})` }}
          />
        )}
        {leftIcon && <span className="inline-flex shrink-0 [&>svg]:w-3 [&>svg]:h-3">{leftIcon}</span>}
        <span className="relative">{children}</span>
        {rightIcon && <span className="inline-flex shrink-0 [&>svg]:w-3 [&>svg]:h-3">{rightIcon}</span>}
        {removable && (
          <button
            type="button"
            className="inline-flex shrink-0 ml-0.5 rounded-full hover:bg-black/10 p-0.5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label="Remove"
          >
            <X size={10} />
          </button>
        )}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
