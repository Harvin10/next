"use client"

import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../components/Button';
import SortPanel from '../../components/SortPanel/SortPanel';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

type SortOption = 'price-asc' | 'price-desc' | 'location';

const realEstateListings = [
  {
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    price: 'Rp 7.500.000.000',
    description: 'Beautiful 3 bedroom house with a garden.',
    location: 'Los Angeles, CA',
    whatsappLink: 'https://wa.me/1234567890',
  },
  {
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    price: 'Rp 11.250.000.000',
    description: 'Modern 4 bedroom apartment with city view.',
    location: 'San Francisco, CA',
    whatsappLink: 'https://wa.me/1234567890',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    price: 'Rp 9.800.000.000',
    description: 'Luxurious 5 bedroom villa with private pool',
    location: 'Miami Beach, FL',
    whatsappLink: 'https://wa.me/1234567890',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    price: 'Rp 5.400.000.000',
    description: 'Cozy 2 bedroom beachfront condo',
    location: 'San Diego, CA',
    whatsappLink: 'https://wa.me/1234567890',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    price: 'Rp 15.750.000.000',
    description: 'Premium penthouse with panoramic views',
    location: 'New York City, NY',
    whatsappLink: 'https://wa.me/1234567890',
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
    price: 'Rp 6.900.000.000',
    description: 'Modern townhouse in gated community',
    location: 'Seattle, WA',
    whatsappLink: 'https://wa.me/1234567890',
  }
];

const parsePrice = (price: string) => parseInt(price.replace(/[^0-9]/g, ''), 10);

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'' | SortOption>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const locations = useMemo(() => 
    Array.from(new Set(realEstateListings.map(listing => listing.location)))
  , []);

  const filteredListings = useMemo(() => {
    return realEstateListings
      .filter(listing => {
        const matchesSearch = 
          listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.price.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation = !selectedLocation || listing.location === selectedLocation;

        const price = parsePrice(listing.price);
        const matchesPriceRange = 
          (!priceRange.min || price >= parseInt(priceRange.min, 10)) &&
          (!priceRange.max || price <= parseInt(priceRange.max, 10));

        return matchesSearch && matchesLocation && matchesPriceRange;
      })
      .sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);

        switch (sortBy) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'location':
            return a.location.localeCompare(b.location);
          default:
            return 0;
        }
      });
  }, [searchTerm, sortBy, priceRange, selectedLocation]);

  const FilterIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const SortIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9M3 12h5m8 0l-4-4m4 4l-4 4" />
    </svg>
  );

  return (
    <div className="products-page container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-xl font-semibold">Real Estate Listings</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsSortOpen(true)}
              variant="outline"
              size="sm"
              icon={<SortIcon />}
            >
              Sort
            </Button>
            <Button
              onClick={() => setIsFilterOpen(true)}
              variant="primary"
              size="sm"
              icon={<FilterIcon />}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>

      <SortPanel
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedLocation={selectedLocation}
        locations={locations}
        priceRange={priceRange}
        onLocationChange={setSelectedLocation}
        onPriceRangeChange={setPriceRange}
      />

      {filteredListings.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No listings found
        </div>
      ) : (
        <div className="real-estate-listings grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredListings.map((listing, index) => (
            <ProductCard key={index} {...listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
