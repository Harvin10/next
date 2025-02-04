'use client';

import React from 'react';
import Button from '../Button/Button';
import { PROPERTY_TYPES } from '../../lib/constants';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPropertyType: string;
  priceRange: { min: string; max: string };
  onPropertyTypeChange: (type: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  onApply: () => void;  // Add this prop
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  selectedPropertyType,
  priceRange,
  onPropertyTypeChange,
  onPriceRangeChange,
  onApply,  // Add this prop
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Filters</h2>
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

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={selectedPropertyType}
              onChange={(e) => onPropertyTypeChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t">
          <Button
            onClick={() => {
              onApply();
              onClose();
            }}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
