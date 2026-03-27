import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string;
}

export function Avatar({ initials, className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700',
        className,
      )}
      aria-label={`Avatar ${initials}`}
      {...props}
    >
      {initials}
    </div>
  );
}
