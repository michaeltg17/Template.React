import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import type { Product } from '@/types/api';
import { getProductsQueryOptions } from './get-products';
import { createProductInputSchema } from './create-product';
import type { MutationConfig } from '@/lib/react-query';

export type UpdateProductInput = z.infer<typeof createProductInputSchema>;

export const updateProduct = ({ id, data }: { id: string; data: UpdateProductInput }): Promise<Product> =>
  api.put(`/products/${id}`, data, undefined);

export const useUpdateProduct = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof updateProduct> } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getProductsQueryOptions().queryKey }),
    ...mutationConfig,
  });
};

