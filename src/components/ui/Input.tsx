import React from 'react';
import { cn } from './Button';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent placeholder:text-gray-400',
          className
        )}
        {...props}
      />
    );
  }
);

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn('block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider', className)}>
    {children}
  </label>
);
