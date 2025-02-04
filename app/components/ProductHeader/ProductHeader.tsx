'use client';

import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import { FilterIcon, SortIcon } from '../Icons';

interface ProductHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSortClick: () => void;
  onFilterClick: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onSortClick,
  onFilterClick,
}) => (
  <div className="flex flex-col gap-4 mb-6">
    <SearchBar 
      value={searchTerm} 
      onChange={onSearchChange} 
      placeholder="Search by location..."
    />
    <div className="flex justify-between items-center gap-2">
      <h1 className="text-xl font-semibold">
        {searchTerm || 'All Locations'}
      </h1>
      <div className="flex gap-2">
        <Button
          onClick={onSortClick}
          variant="outline"
          size="sm"
          icon={<SortIcon />}
        >
          Sort
        </Button>
        <Button
          onClick={onFilterClick}
          variant="primary"
          size="sm"
          icon={<FilterIcon />}
        >
          Filter
        </Button>
      </div>
    </div>
  </div>
);

export default ProductHeader;
