import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'amber' | 'neutral' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  className,
  size = 'md',
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full uppercase tracking-wider',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        variant === 'brand' &&
          'bg-brand-50 text-brand-600 border border-brand-200/80',
        variant === 'success' &&
          'bg-emerald-50 text-emerald-700 border border-emerald-200',
        variant === 'amber' &&
          'bg-amber-50 text-amber-700 border border-amber-200',
        variant === 'neutral' &&
          'bg-stone-100 text-stone-700 border border-stone-200',
        variant === 'outline' &&
          'bg-transparent text-stone-600 border border-stone-300',
        className
      )}
    >
      {children}
    </span>
  );
};
