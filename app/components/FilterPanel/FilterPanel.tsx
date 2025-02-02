import React from 'react';
import Button from '../Button';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  locations: string[];
  priceRange: { min: string; max: string };
  onLocationChange: (location: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  locations,
  priceRange,
  onLocationChange,
  onPriceRangeChange,
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
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
            onClick={onClose}
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
