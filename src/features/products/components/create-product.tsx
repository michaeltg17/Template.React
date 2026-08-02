'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProductInputSchema,
  type CreateProductInput,
  useCreateProduct,
} from '../api/create-product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const CreateProduct = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductInputSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
    },
  });

  const create = useCreateProduct();

  const onSubmit = (data: CreateProductInput) => {
    create.mutate(data, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <Input {...register('title')} placeholder="Product name" />
        {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
      </FormItem>
      <FormItem>
        <FormLabel>Description</FormLabel>
        <Input {...register('description')} placeholder="Description" />
        {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
      </FormItem>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <Input {...register('price')} type="number" step="0.01" />
          {errors.price && <FormMessage>{errors.price.message}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Input {...register('category')} placeholder="Electronics" />
          {errors.category && <FormMessage>{errors.category.message}</FormMessage>}
        </FormItem>
      </div>
      <FormItem>
        <FormLabel>Image URL</FormLabel>
        <Input {...register('imageUrl')} type="url" placeholder="https://..." />
        {errors.imageUrl && <FormMessage>{errors.imageUrl.message}</FormMessage>}
      </FormItem>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
