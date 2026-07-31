'use client';

import { AppLayout } from '@/components/layouts';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
