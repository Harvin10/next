'use client';

import React from 'react';
import SearchBar from '../common/SearchBar/SearchBar';
import Button from '../common/Button/Button';
import { FilterIcon, SortIcon } from '../../../public/images';

interface ProductHeaderProps {
  onSearchSubmit: () => void;
  onSortClick: () => void;
  onFilterClick: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onSearchSubmit,
  onSortClick,
  onFilterClick,
}) => (
  <div className="mb-8 space-y-4">
    <SearchBar
      onSubmit={onSearchSubmit}
      placeholder="Search by location..."
    />

    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={onSortClick}
        icon={<SortIcon />}
      >
        Sort
      </Button>
      <Button
        variant="outline"
        onClick={onFilterClick}
        icon={<FilterIcon />}
      >
        Filter
      </Button>
    </div>
  </div>
);

export default ProductHeader;
