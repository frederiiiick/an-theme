import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'solid' | 'outline' | 'soft' | 'dot';
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'pink';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  animate?: boolean;
  children: ReactNode;
}
