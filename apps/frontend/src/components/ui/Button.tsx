import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
          {
            'bg-champagne text-charcoal hover:bg-white shadow-[0_0_20px_rgba(248,243,242,0.2)]': variant === 'primary',
            'glass-bronze hover:bg-bronze/10 text-champagne border-bronze/20': variant === 'secondary',
            'hover:bg-white/[0.02] text-champagne/60 hover:text-champagne': variant === 'ghost',
            'h-9 px-4 text-xs uppercase': size === 'sm',
            'h-11 px-8 text-sm uppercase': size === 'md',
            'h-14 px-10 text-base uppercase': size === 'lg',
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children as React.ReactNode}</span>
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
