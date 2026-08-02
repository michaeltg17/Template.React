import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import type { Product } from '@/types/api';
import type { MutationConfig } from '@/lib/react-query';
import { getProductsQueryOptions } from '@/features/products/api/get-products';

export const createProductInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  price: z.coerce.number().positive('Must be positive'),
  imageUrl: z.string().url('Invalid URL').optional(),
  category: z.string().min(1, 'Required'),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export const createProduct = async (data: CreateProductInput): Promise<Product> =>
  api.post('/products', data, undefined);

export const useCreateProduct = ({
  mutationConfig,
}: { mutationConfig?: MutationConfig<typeof createProduct> } = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getProductsQueryOptions().queryKey });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
