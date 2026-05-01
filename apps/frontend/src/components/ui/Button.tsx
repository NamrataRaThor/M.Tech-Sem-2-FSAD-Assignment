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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
          {
            'bg-foreground text-background hover:bg-foreground/90': variant === 'primary',
            'glass hover:bg-white/10 text-foreground': variant === 'secondary',
            'hover:bg-white/5 text-foreground/80 hover:text-foreground': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-8 text-base': size === 'md',
            'h-14 px-10 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        )}
        <span className="relative z-10">{children as React.ReactNode}</span>
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
