import React from 'react';
import { cn } from './Button';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden', className)}>
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: any }) => (
  <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
    <div className="flex items-center space-x-4">
      {Icon && (
        <div className="p-2 bg-white rounded-xl border border-gray-100 shadow-sm text-accent">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <h3 className="font-black text-gray-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs font-medium text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  </div>
);
