import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'gradient';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'light',
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl transition-all duration-300 overflow-hidden',
        variant === 'light' &&
          'bg-white/80 backdrop-blur-xl border border-white/60 shadow-glass',
        variant === 'dark' &&
          'bg-stone-900/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl',
        variant === 'gradient' &&
          'bg-gradient-to-br from-white/90 via-rose-50/40 to-amber-50/30 backdrop-blur-xl border border-rose-100/60 shadow-glass',
        hoverEffect &&
          'hover:-translate-y-1 hover:shadow-glass-hover hover:border-brand-500/30',
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
