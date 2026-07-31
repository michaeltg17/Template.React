'use client';

import { useDeleteProduct } from '../api/delete-product';
import { Spinner } from '@/components/ui/spinner';

export const DeleteProduct = ({ id, children }: { id: string; children?: React.ReactNode }) => {
  const deleteProduct = useDeleteProduct();

  return (
    <button
      onClick={() => deleteProduct.mutate(id)}
      disabled={deleteProduct.isPending}
      className="text-red-600 hover:text-red-800"
    >
      {deleteProduct.isPending ? <Spinner size="sm" /> : children}
    </button>
  );
};