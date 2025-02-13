'use client';

import React from 'react';
import Button from '../Button/Button';
import { SortOption } from '../../lib/types';

interface SortPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
}) => {
  if (!isOpen) return null;

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: '-price' },
    { label: 'Name: A to Z', value: 'description' },
    { label: 'Name: Z to A', value: '-description' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sort By</h2>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="!p-2"
            >
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-[#b22222]"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={() => onSortChange(option.value as SortOption)}
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t">
          <Button
            onClick={onClose}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Apply Sort
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortPanel;
