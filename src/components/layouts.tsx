import * as React from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Header } from '@/components/layouts/header';

export const AppLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
};

export const Layout = AppLayout;
