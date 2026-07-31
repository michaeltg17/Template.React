import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Product, Meta } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';

export const getProducts = async ({ page = 1 }: { page?: number } = {}): Promise<{ data: Product[]; meta: Meta }> =>
  api.get('/products', { params: { page } });

export const getProductsQueryOptions = ({ page = 1 }: { page?: number } = {}) =>
  queryOptions({
    queryKey: ['products', { page }],
    queryFn: () => getProducts({ page }),
  });

export const useProducts = ({ page, queryConfig }: { page?: number; queryConfig?: QueryConfig<typeof getProductsQueryOptions> } = {}) => {
  return useQuery({
    ...getProductsQueryOptions({ page }),
    ...queryConfig,
  });
};

