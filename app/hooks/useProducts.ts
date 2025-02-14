import { useState, useEffect, useCallback } from 'react';
import { Product, SortOption } from '../../lib/types';


const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>({
    sortOptionPrice: 'price-asc',
    sortOptionDate: 'newest'
  });
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: { min: '', max: '' },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (searchQuery?: string, sortQuery?: SortOption, filterParams?: { propertyType: string; priceRange: { min: string; max: string } }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery || currentSearchQuery,
        propertyType: filterParams?.propertyType || filters.propertyType,
        minPrice: filterParams?.priceRange.min || filters.priceRange.min,
        maxPrice: filterParams?.priceRange.max || filters.priceRange.max,
        sortByPrice: sortQuery?.sortOptionPrice || sortBy.sortOptionPrice,
        sortByDate: sortQuery?.sortOptionDate || sortBy.sortOptionDate,
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
  }, [currentSearchQuery, filters, sortBy, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback(async (query?: string) => {
    await setCurrentPage(1);
    await setCurrentSearchQuery(query);
    fetchProducts(query);
  }, [fetchProducts]);

  const handleSortApply = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    fetchProducts('', newSortBy);
  };

  const handleFilterApply = (newFilters: { propertyType: string; priceRange: { min: string; max: string } }) => {
    setFilters(newFilters);
    fetchProducts('', undefined, newFilters);
  };

  const handlePageChange = useCallback(async (page: number) => {
    await setCurrentPage(page);
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    currentSearchQuery,
    sortBy,
    filters,
    currentPage,
    totalPages,
    handleSearch,
    handleSortApply,
    handleFilterApply,
    handlePageChange,
  };
};

export default useProducts;
