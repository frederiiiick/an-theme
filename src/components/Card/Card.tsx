import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { CardProps } from './Card.types';
import { cn } from '../../utils/cn';
import { injectPulseStyles, createCardPulse } from '../../providers/pulse-styles';

const colorVarMap: Record<NonNullable<CardProps['color']>, string> = {
  primary: '--an-color-primary',
  secondary: '--an-color-secondary',
  accent: '--an-color-accent',
  info: '--an-color-info',
  success: '--an-color-success',
  warning: '--an-color-warning',
  pink: '--an-color-pink',
};

const STRIPE_COLORS = ['--an-color-pink', '--an-color-primary', '--an-color-info', '--an-color-accent'];

function getStripeColors(colorVar: string | null): string[] {
  return STRIPE_COLORS.map((stripe) =>
    stripe === colorVar ? 'white' : `var(${stripe})`,
  );
}

const baseStyles =
  'rounded-[var(--an-radius-lg)] p-6 font-[family-name:var(--an-font-body)] text-white overflow-hidden relative';

const hoverStyles =
  'transition-all duration-[var(--an-duration-normal)] cursor-pointer hover:shadow-[var(--an-shadow-lg)] hover:-translate-y-0.5';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', color, hoverable = false, className, style, children, ...props },
    ref,
  ) => {
    const effectiveColor = color ?? (variant === 'striped' ? undefined : 'primary');
    const isStripedNoColor = variant === 'striped' && !effectiveColor;
    const colorVar = effectiveColor ? colorVarMap[effectiveColor] : null;

    const internalRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (!hoverable) return;
      injectPulseStyles();
    }, [hoverable]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hoverable || !internalRef.current) return;
        const card = internalRef.current;
        const resolvedColor = colorVar
          ? getComputedStyle(card).getPropertyValue(colorVar).trim()
          : '#ffffff';
        createCardPulse(e.nativeEvent, card, resolvedColor);
      },
      [hoverable, colorVar],
    );

    const variantClass = variant === 'elevated' || variant === 'striped'
      ? 'shadow-[var(--an-shadow-md)]'
      : '';

    const backgroundColor = isStripedNoColor ? '#ffffff' : `var(${colorVar})`;
    const textColorClass = isStripedNoColor ? 'text-gray-800' : 'text-white';

    return (
      <div
        ref={setRefs}
        className={cn(
          baseStyles,
          variantClass,
          textColorClass,
          hoverable && hoverStyles,
          className,
        )}
        style={{ backgroundColor, ...style }}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {variant === 'pattern' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.35) 1.5px, transparent 1.5px)',
              backgroundSize: '14px 14px',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            }}
          />
        )}
        {variant === 'elevated' && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{
              background: `linear-gradient(
                160deg,
                rgba(255,255,255,0.45) 0%,
                rgba(255,255,255,0.15) 30%,
                transparent 55%
              )`,
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.08)',
            }}
          />
        )}
        {variant === 'striped' && (() => {
          const [s1, s2, s3, s4] = getStripeColors(colorVar);
          return (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  135deg,
                  transparent 30%,
                  ${s1} 30%, ${s1} 33%,
                  ${s2} 33%, ${s2} 36%,
                  ${s3} 36%, ${s3} 39%,
                  ${s4} 39%, ${s4} 42%,
                  transparent 42%
                )`,
                opacity: 0.85,
              }}
            />
          );
        })()}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

Card.displayName = 'Card';
