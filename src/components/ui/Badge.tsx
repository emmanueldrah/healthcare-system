import React from 'react';
import { cn } from './Button';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: BadgeProps) => {
  const variants = {
    success: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    neutral: 'bg-gray-50 text-gray-700 border-gray-100',
  };

  return (
    <span className={cn(
      'px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-wider inline-flex items-center',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
