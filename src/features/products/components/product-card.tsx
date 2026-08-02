'use client';

import type { Product } from '@/types/api';

export const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: (product: Product) => void;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <span className="text-4xl">???��?</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        <p className="mt-1 text-xs text-gray-500 uppercase">{product.category}</p>
      </div>
    </div>
  );
};
