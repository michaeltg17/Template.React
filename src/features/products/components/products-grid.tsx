'use client';

import { useState } from 'react';
import { useProducts } from '../api/get-products';
import { ProductCard } from './product-card';
import { ProductDetail } from './product-detail';
import { CreateProduct } from './create-product';
import type { Product } from '@/types/api';
import { useUser } from '@/lib/auth';
import { canCreateProduct } from '@/lib/authorization';
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateProductStore } from '@/stores/create-product';

export const ProductsGrid = () => {
  const { data, isLoading, error } = useProducts();
  const { data: user } = useUser();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { isOpen: isCreateOpen, close: closeCreate } = useCreateProductStore();

  const products = data?.data;

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error) return <div className="text-center text-red-600 py-10">Error loading products</div>;
  if (!products?.length) return <div className="text-center text-gray-500 py-10">No products found. {canCreateProduct(user) && <span>Click {'"'}Add Product{'"'} to create one.</span>}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} onClick={(p) => { setSelectedProduct(p); setIsDetailOpen(true); }} />
        ))}
      </div>

      <ProductDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
      />

      <Dialog open={isCreateOpen} onOpenChange={(open) => !open && closeCreate()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
          </DialogHeader>
          <CreateProduct onClose={closeCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
};