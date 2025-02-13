export interface Product {
  id: string;
  image: string;
  price: string;
  description: string;
  location: string;
  whatsappLink: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  amenities?: string[];
}

export type SortOption = 'price' | '-price' | 'description' | '-description' | '';
