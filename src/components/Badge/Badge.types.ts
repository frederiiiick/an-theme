import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'soft';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  children: ReactNode;
}
