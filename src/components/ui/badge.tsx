import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700',
        className,
      )}
      {...props}
    />
  );
}
