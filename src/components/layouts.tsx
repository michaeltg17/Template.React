import * as React from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const AppLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {children}
    </div>
  );
};

export const Layout = AppLayout;
