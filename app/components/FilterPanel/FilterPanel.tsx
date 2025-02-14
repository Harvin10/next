'use client';

import React, { useState, useEffect } from 'react';
import Button from '../common/Button/Button';
import { PROPERTY_TYPES } from '../../../lib/constants';
import Popup from '../common/Popup/Popup';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    propertyType: string;
    priceRange: { min: string; max: string };
  }) => void;
  filters: {
    propertyType: string;
    priceRange: { min: string; max: string };
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onApply,
  filters: initialFiltersProp,
}) => {
  const [initialFilters, setInitialFilters] = useState({
    propertyType: '',
    priceRange: { min: '', max: '' },
  });

  useEffect(() => {
    setInitialFilters(initialFiltersProp);
  }, [initialFiltersProp]);

  const handlePropertyTypeChange = (type: string) => {
    setInitialFilters({ ...initialFilters, propertyType: type });
  };

  const handlePriceRangeChange = (range: { min: string; max: string }) => {
    setInitialFilters({ ...initialFilters, priceRange: range });
  };

  const handleApply = () => {
    onApply(initialFilters);
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Filters">
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            value={initialFilters.propertyType}
            onChange={(e) => handlePropertyTypeChange(e.target.value)}
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
              value={initialFilters.priceRange.min}
              onChange={(e) => handlePriceRangeChange({ ...initialFilters.priceRange, min: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              value={initialFilters.priceRange.max}
              onChange={(e) => handlePriceRangeChange({ ...initialFilters.priceRange, max: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-t">
        <Button
          onClick={handleApply}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Apply Filters
        </Button>
      </div>
    </Popup>
  );
};

export default FilterPanel;
