'use client';

import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../lib/types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-8">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;