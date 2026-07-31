'use client';

import { useDeleteProduct } from '../api/delete-product';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export const DeleteProductDialog = ({ productId, onClose }: { productId: string; onClose: () => void }) => {
  const deleteProduct = useDeleteProduct();

  return (
    <Button
      variant="destructive"
      onClick={() => deleteProduct.mutate(productId, { onSuccess: () => onClose() })}
      disabled={deleteProduct.isPending}
    >
      {deleteProduct.isPending ? <Spinner size="sm" /> : 'Delete'}
    </Button>
  );
};