import * as React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-brand-500 text-white hover:bg-brand-600 shadow-glow',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-border bg-white text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  default: 'h-11 px-5 py-2.5',
  sm: 'h-9 rounded-xl px-4 text-sm',
  lg: 'h-12 rounded-2xl px-6 text-base',
  icon: 'h-11 w-11',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
