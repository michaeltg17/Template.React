'use client';

import { useState } from 'react';
import { useProducts } from '../api/get-products';
import { ProductCard } from './product-card';
import { ProductDetail } from './product-detail';
import { CreateProduct } from './create-product';
import type { Product } from '@/types/api';
import { useUser } from '@/lib/auth';
import { canCreateProduct } from '@/lib/authorization';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const ProductsGrid = () => {
  const { data, isLoading, error } = useProducts();
  const { data: user } = useUser();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const products = data?.data;

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error) return <div className="text-center text-red-600 py-10">Error loading products</div>;
  if (!products?.length) return <div className="text-center text-gray-500 py-10">No products found. {canCreateProduct(user) && <span>Click {'"'}Add Product{'"'} to create one.</span>}</div>;

  return (
    <div className="space-y-6">
      {canCreateProduct(user) && (
        <div className="flex justify-end">
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      )}

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

      <Dialog open={isCreateOpen} onOpenChange={(open) => !open && setIsCreateOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
          </DialogHeader>
          <CreateProduct onClose={() => setIsCreateOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};