export interface Product {
  id: string;
  image: string;
  price: string;
  description: string;
  location: string;
  propertyType: 'house' | 'apartment' | 'villa' | 'condo' | 'penthouse' | 'townhouse';
  whatsappLink: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  yearBuilt: number;
  createdAt: Date;
}

export interface DataService {
  getProducts(): Promise<Product[]>;
  getLocations(query: string): Promise<string[]>;
}

export type SortOption = {
  sortOptionPrice: SortOptionPrice;
  sortOptionDate: SortOptionDate;
}

export type SortOptionPrice =
  | 'price-asc'
  | 'price-desc';

export type SortOptionDate =
  | 'newest'
  | 'oldest';
