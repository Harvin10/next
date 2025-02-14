"use client"

import React, { useState } from 'react';

// components
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Pagination from '../../components/common/Pagination/Pagination';
import SortPanel from '../../components/SortPanel/SortPanel';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

// hooks
import useProducts from '../../hooks/useProducts';

const ProductsPage = () => {
  const {
    products,
    loading,
    sortBy,
    filters,
    currentPage,
    totalPages,
    handleSearch,
    handleSortApply,
    handleFilterApply,
    handlePageChange,
  } = useProducts();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="products-page container mx-auto px-4 py-4 sm:py-8">
      <ProductHeader
        onSearchSubmit={handleSearch}
        onSortClick={() => setIsSortOpen(true)}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      <ProductGrid
        products={products}
        loading={loading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <SortPanel
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        onApply={handleSortApply}
        sortBy={sortBy}
      />

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        filters={filters}
      />
    </div>
  );
};

export default ProductsPage;
