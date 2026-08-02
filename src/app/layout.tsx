import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { AppProvider } from '@/app/provider';
import { getUserQueryOptions } from '@/lib/auth';
import '@/styles/globals.css';

export const metadata = {
  title: 'Template React',
  description: 'Products CRUD app',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery(getUserQueryOptions());
  } catch {
    /* Ignore SSR prefetch failures - client-side will retry */
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const dynamic = 'force-dynamic';


