import { forwardRef, useId } from 'react';
import type { JumbotronProps } from './Jumbotron.types';
import { cn } from '../../utils/cn';

const DEFAULT_COLORS = [
  '--an-color-primary',
  '--an-color-secondary',
  '--an-color-accent',
  '--an-color-info',
  '--an-color-pink',
  '--an-color-warning',
];

const circleSizeMap = {
  sm: { classes: 'w-12 h-12', px: 48 },
  md: { classes: 'w-16 h-16', px: 64 },
  lg: { classes: 'w-24 h-24', px: 96 },
} as const;

const textSizeMap: Record<1 | 2 | 3, Record<'sm' | 'md' | 'lg', string>> = {
  1: { sm: '1.5rem', md: '2.25rem', lg: '3.75rem' },
  2: { sm: '2.5rem', md: '3.5rem', lg: '4.5rem' },
  3: { sm: '1.8rem', md: '2.5rem', lg: '3.8rem' },
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

function isVowel(char: string): boolean {
  return VOWELS.has(char.toLowerCase());
}

function syllableSplit(text: string, targetSize: number): string[] {
  const chunks: string[] = [];
  let i = 0;

  while (i < text.length) {
    if (text[i] === ' ') {
      chunks.push(' ');
      i++;
      continue;
    }

    let end = Math.min(i + targetSize, text.length);

    if (end < text.length && text[end] !== ' ') {
      let bestBreak = end;

      for (let j = end; j > i + 1; j--) {
        if (text[j] === ' ') {
          bestBreak = j;
          break;
        }
        if (!isVowel(text[j - 1]) && isVowel(text[j])) {
          bestBreak = j;
          break;
        }
      }

      if (bestBreak > i && bestBreak <= i + targetSize + 1) {
        end = bestBreak;
      }
    }

    const chunk = text.slice(i, end);
    chunks.push(chunk);
    i = end;
  }

  return chunks;
}

function getTargetCircleIndex(count: number): number {
  return Math.ceil(count / 2) - 1;
}

interface CurvedLabelProps {
  text: string;
  circlePx: number;
  pathId: string;
}

function CurvedLabel({ text, circlePx, pathId }: CurvedLabelProps) {
  const svgSize = circlePx * 1.4;
  const height = circlePx * 0.5;
  const radius = circlePx * 0.55;
  const cx = svgSize / 2;

  const pathD = `M ${cx - radius},${height} A ${radius},${radius} 0 0,1 ${cx + radius},${height}`;

  return (
    <svg
      width={svgSize}
      height={height}
      className="absolute left-1/2 -translate-x-1/2 overflow-visible pointer-events-none"
      style={{ top: '-5px' }}
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>
      <text
        className="fill-[var(--an-color-text)] font-[family-name:var(--an-font-heading)]"
        style={{ fontSize: `${circlePx * 0.2}px`, fontWeight: 600 }}
      >
        <textPath
          href={`#${pathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export const Jumbotron = forwardRef<HTMLDivElement, JumbotronProps>(
  (
    {
      text,
      chunkSize = 2,
      chunks: manualChunks,
      colors,
      size = 'md',
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const uniqueId = useId();
    const chunks = manualChunks || syllableSplit(text, chunkSize);
    const colorCycle = colors || DEFAULT_COLORS;
    const { classes: circleClasses, px: circlePx } = circleSizeMap[size];

    const effectiveChunkSize: 1 | 2 | 3 = manualChunks
      ? (Math.min(Math.max(...manualChunks.map((c) => c.trim().length), 1), 3) as 1 | 2 | 3)
      : chunkSize;

    const fontSize = textSizeMap[effectiveChunkSize][size];
    const targetIndex = label ? getTargetCircleIndex(chunks.length) : -1;

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-3', className)}
        {...props}
      >
        {chunks.map((chunk, index) => {
          const isBlank = chunk.trim().length === 0;
          const colorVar = colorCycle[index % colorCycle.length];
          const isLabelTarget = index === targetIndex;

          return (
            <div key={index} className="relative">
              {isLabelTarget && label && (
                <CurvedLabel
                  text={label}
                  circlePx={circlePx}
                  pathId={`an-label-${uniqueId}`}
                />
              )}
              <div
                className={cn(
                  circleClasses,
                  'rounded-full flex items-center justify-center overflow-hidden shrink-0',
                )}
                style={{ backgroundColor: `var(${colorVar})` }}
                aria-hidden={isBlank || undefined}
              >
                {!isBlank && (
                  <span
                    className="font-[family-name:var(--an-font-heading)] text-white font-bold leading-none select-none"
                    style={{ fontSize }}
                  >
                    {chunk}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Jumbotron.displayName = 'Jumbotron';
