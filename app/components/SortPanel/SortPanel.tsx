'use client';

import React, { useState, useEffect } from 'react';
import Popup from '../common/Popup/Popup';
import Button from '../common/Button/Button';
import { SortOption } from '@/lib/types';

interface SortPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onApply: (sortBy: SortOption) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({
  isOpen,
  onClose,
  sortBy,
  onApply,
}) => {
  const [selectedSortBy, setSelectedSortBy] = useState<SortOption>(sortBy);

  useEffect(() => {
    setSelectedSortBy(sortBy);
  }, [sortBy]);

  const handleApply = () => {
    onApply(selectedSortBy);
    onClose();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortBy({ ...selectedSortBy, sortOptionPrice: e.target.value as SortOption['sortOptionPrice'] })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortBy({ ...selectedSortBy, sortOptionDate: e.target.value as SortOption['sortOptionDate'] })
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Sort By">
      <div className="p-6 space-y-4">
        <div>
          <p>Price</p>
          <input type="radio" id="price-asc" name="price" value="price-asc" checked={selectedSortBy.sortOptionPrice === 'price-asc'} onChange={handlePriceChange} />
          <label htmlFor="price-asc">Price Asc</label>
          <input type="radio" id="price-desc" name="price" value="price-desc" checked={selectedSortBy.sortOptionPrice === 'price-desc'} onChange={handlePriceChange} />
          <label htmlFor="price-desc">Price Desc</label>
        </div>
        <div>
          <p>Date</p>
          <input type="radio" id="newest" name="date" value="newest" checked={selectedSortBy.sortOptionDate === 'newest'} onChange={handleDateChange} />
          <label htmlFor="newest">Newest</label>
          <input type="radio" id="oldest" name="date" value="oldest" checked={selectedSortBy.sortOptionDate === 'oldest'} onChange={handleDateChange} />
          <label htmlFor="oldest">Oldest</label>
        </div>
      </div>
      <div className="p-6 border-t">
        <Button
          onClick={handleApply}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Apply Sort
        </Button>
      </div>
    </Popup>
  );
};

export default SortPanel;
