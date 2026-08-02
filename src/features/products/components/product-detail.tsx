'use client';

import { UpdateProduct } from './update-product';
import { DeleteProductDialog } from './delete-product-dialog';
import type { Product } from '@/types/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDate } from '@/utils/format';
import { useUser } from '@/lib/auth';
import { canUpdateProduct, canDeleteProduct } from '@/lib/authorization';

export const ProductDetail = ({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}) => {
  const { data: user } = useUser();

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-gray-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center text-6xl text-gray-300">
                {product.title[0]}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Created: {formatDate(product.createdAt)}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Description</h4>
            <p className="mt-1 text-sm text-gray-600">{product.description}</p>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            {canUpdateProduct(user) && <UpdateProduct product={product} onClose={onClose} />}
            {canDeleteProduct(user) && (
              <DeleteProductDialog productId={product.id} onClose={onClose} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
