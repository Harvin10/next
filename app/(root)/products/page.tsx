"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Product, SortOption } from '../../lib/types';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Pagination from '../../components/Pagination/Pagination';
import SortPanel from '../../components/SortPanel/SortPanel';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'' | SortOption>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use ref to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        ...(selectedPropertyType && { propertyType: selectedPropertyType }),
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max }),
        ...(sortBy && { sortBy }),
        page: currentPage.toString(),
        limit: '12',
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      if (isMounted.current) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [searchTerm, selectedPropertyType, priceRange.min, priceRange.max, sortBy, currentPage]);

  // Handle search and sort changes
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts();
  }, [searchTerm, sortBy]);

  // Handle pagination changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleFilterApply = useCallback(() => {
    setCurrentPage(1);
    fetchProducts();
  }, [fetchProducts]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-page container mx-auto px-4 py-4 sm:py-8">
      <ProductHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSortClick={() => setIsSortOpen(true)}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      <SortPanel
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
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

      <ProductGrid 
        products={products}
        loading={loading}
      />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductsPage;
