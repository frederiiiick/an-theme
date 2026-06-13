import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
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
    { variant = 'default', color, hoverable = false, animate: shouldAnimate = false, className, style, children, ...props },
    ref,
  ) => {
    const effectiveColor = color ?? (variant === 'striped' ? undefined : 'primary');
    const isStripedNoColor = variant === 'striped' && !effectiveColor;
    const colorVar = effectiveColor ? colorVarMap[effectiveColor] : null;

    const internalRef = useRef<HTMLDivElement | null>(null);
    const hasAnimated = useRef(false);

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

    useEffect(() => {
      if (!shouldAnimate || hasAnimated.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        hasAnimated.current = true;
        return;
      }

      const container = internalRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !hasAnimated.current) {
              hasAnimated.current = true;
              observer.disconnect();

              animate(container, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 500,
                ease: 'outQuad',
              });

              const stripeElements = container.querySelectorAll('[data-an-stripe]');
              if (stripeElements.length > 0) {
                animate(stripeElements, {
                  scaleY: [0, 1],
                  opacity: [0, 0.85],
                  duration: 500,
                  delay: stagger(120),
                  ease: 'outQuad',
                });
              }

              const patternOverlay = container.querySelector('[data-an-pattern]') as HTMLElement | null;
              if (patternOverlay) {
                animate(patternOverlay, {
                  opacity: [0, 1],
                  duration: 600,
                  delay: 300,
                  ease: 'outQuad',
                });
              }
            }
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(container);
      return () => observer.disconnect();
    }, [shouldAnimate]);

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

    const initialStyle: React.CSSProperties = shouldAnimate
      ? { backgroundColor, opacity: 0, transform: 'translateY(30px)', ...style }
      : { backgroundColor, ...style };

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
        style={initialStyle}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {variant === 'pattern' && (
          <div
            data-an-pattern
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.35) 1.5px, transparent 1.5px)',
              backgroundSize: '14px 14px',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              ...(shouldAnimate ? { opacity: 0 } : {}),
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
          const stripeColors = getStripeColors(colorVar);
          return (
            <>
              {stripeColors.map((color, i) => {
                const start = 30 + i * 3;
                const end = start + 3;
                return (
                  <div
                    key={i}
                    data-an-stripe
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent ${start}%, ${color} ${start}%, ${color} ${end}%, transparent ${end}%)`,
                      opacity: shouldAnimate ? 0 : 0.85,
                    }}
                  />
                );
              })}
            </>
          );
        })()}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

Card.displayName = 'Card';
