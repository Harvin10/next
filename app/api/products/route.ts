import { NextRequest, NextResponse } from 'next/server';
import { MockDataService } from '../../../lib/mock-data';
import { Product } from '../../../lib/types';

interface ProductQuery {
  q?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export async function GET(request: NextRequest) {
  const { nextUrl } = request;
  const queryParams: ProductQuery = {
    q: nextUrl.searchParams.get('q') || '',
    propertyType: nextUrl.searchParams.get('propertyType') || '',
    minPrice: nextUrl.searchParams.get('minPrice') || '',
    maxPrice: nextUrl.searchParams.get('maxPrice') || '',
    sortBy: nextUrl.searchParams.get('sortBy') || '',
    page: nextUrl.searchParams.get('page') || '1',
    limit: nextUrl.searchParams.get('limit') || '12',
  };

  const mockDataService = new MockDataService();

  const params = {
    query: queryParams.q || '',
    propertyType: queryParams.propertyType || '',
    minPrice: queryParams.minPrice || '',
    maxPrice: queryParams.maxPrice || '',
    sortBy: queryParams.sortBy || '',
    page: parseInt(queryParams.page || '1', 10),
    limit: parseInt(queryParams.limit || '12', 10),
  };

  try {
    const { products, totalPages } = await mockDataService.getFilteredProducts(params);

    return NextResponse.json({
      products: products,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export type { Product };
