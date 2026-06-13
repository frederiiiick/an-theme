import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pattern' | 'elevated' | 'striped';
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'pink';
  hoverable?: boolean;
  animate?: boolean;
  children: ReactNode;
}
