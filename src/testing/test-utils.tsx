import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '@/lib/react-query';
import type { ReactNode } from 'react';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: queryConfig,
  });

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = createQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const customRender = (ui: ReactNode, options?: RenderOptions) =>
  render(ui, { wrapper: Provider, ...options });

export * from '@testing-library/react';
export { customRender as render };
