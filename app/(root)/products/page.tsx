"use client"

import React, { useState, useEffect } from 'react';
import { Product, SortOption } from '../../lib/types';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Pagination from '../../components/Pagination/Pagination';
import SortPanel from '../../components/SortPanel/SortPanel';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'' | SortOption>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchProducts = async (searchQuery?: string, sortQuery?: SortOption) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery || currentSearchQuery,
        propertyType: selectedPropertyType,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sortBy: sortQuery || sortBy,
        page: `${currentPage}`,
        limit: '12',
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleSortApply = async (sortBy) => {
    await setCurrentPage(1);
    await setSortBy(sortBy);
    fetchProducts('', sortBy);
  }

  const handleFilterApply = async () => {
    await setCurrentPage(1);
    fetchProducts();
  };

  const handleSearch = async (query?: string) => {
    await setCurrentPage(1);
    await setCurrentSearchQuery(query);
    fetchProducts(query);
  };

  const handlePageChange = async (page) => {
    await setCurrentPage(page);
    fetchProducts();
  }

  return <>
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
    </div>


    <SortPanel
      isOpen={isSortOpen}
      onClose={() => setIsSortOpen(false)}
      sortBy={sortBy}
      onSortChange={handleSortApply}
    />

    <FilterPanel
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      selectedPropertyType={selectedPropertyType}
      priceRange={priceRange}
      onPropertyTypeChange={setSelectedPropertyType}
      onPriceRangeChange={setPriceRange}
      onApply={handleFilterApply}
    />
  </>;
};

export default ProductsPage;
