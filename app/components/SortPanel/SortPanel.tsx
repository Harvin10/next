import React from 'react';
import Button from '../Button';

type SortOption = 'price-asc' | 'price-desc' | 'location';

interface SortPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption | '';
  onSortChange: (sort: SortOption) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
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
        <div className="space-y-2">
          {['price-asc', 'price-desc', 'location'].map((option) => (
            <button
              key={option}
              onClick={() => {
                onSortChange(option as SortOption);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                sortBy === option 
                  ? 'bg-[#b22222] text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {option === 'price-asc' && 'Price: Low to High'}
              {option === 'price-desc' && 'Price: High to Low'}
              {option === 'location' && 'Location'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortPanel;
