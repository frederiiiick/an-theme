import type { HTMLAttributes } from 'react';

export interface JumbotronProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  chunkSize?: 1 | 2 | 3;
  chunks?: string[];
  colors?: string[];
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  animate?: boolean;
}
