import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn('glass-bronze rounded-2xl p-6 relative overflow-hidden group transition-all duration-700 hover:shadow-[0_8px_40px_0_rgba(205,127,50,0.15)]', className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      {children}
    </motion.div>
  );
}
