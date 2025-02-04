
'use client';

import { Product } from '../../lib/types';
import ProductCard from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No listings found
      </div>
    );
  }

  return (
    <div className="real-estate-listings grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((listing) => (
        <ProductCard key={listing.id} {...listing} />
      ))}
    </div>
  );
};

export default ProductGrid;