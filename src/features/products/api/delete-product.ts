import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { getProductsQueryOptions } from './get-products';
import type { MutationConfig } from '@/lib/react-query';

export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`, undefined);

export const useDeleteProduct = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof deleteProduct> } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getProductsQueryOptions().queryKey }),
    ...mutationConfig,
  });
};

