'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Product } from '@/types/api';
import type { UpdateProductInput } from '../api/update-product';
import { useUpdateProduct } from '../api/update-product';
import { createProductInputSchema } from '../api/create-product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const UpdateProduct = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductInput>({
    resolver: zodResolver(createProductInputSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    },
  });

  const update = useUpdateProduct();

  const onSubmit = (data: UpdateProductInput) => {
    update.mutate(
      { id: product.id, data },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <Input {...register('title')} />
        {errors.title && <FormMessage>{String(errors.title.message)}</FormMessage>}
      </FormItem>
      <FormItem>
        <FormLabel>Description</FormLabel>
        <Input {...register('description')} />
        {errors.description && <FormMessage>{String(errors.description.message)}</FormMessage>}
      </FormItem>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <Input {...register('price')} type="number" step="0.01" />
          {errors.price && <FormMessage>{String(errors.price.message)}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Input {...register('category')} />
          {errors.category && <FormMessage>{String(errors.category.message)}</FormMessage>}
        </FormItem>
      </div>
      <FormItem>
        <FormLabel>Image URL</FormLabel>
        <Input {...register('imageUrl')} type="url" />
        {errors.imageUrl && <FormMessage>{String(errors.imageUrl.message)}</FormMessage>}
      </FormItem>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={update.isPending}>
          {update.isPending ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
