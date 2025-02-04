import { NextRequest, NextResponse } from 'next/server';
import { MockDataService } from '../../lib/mock-data';
import { Product } from '../../lib/types';

const dataService = new MockDataService();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const propertyType = searchParams.get('propertyType') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  const products = await dataService.getFilteredProducts({
    query,
    propertyType,
    minPrice,
    maxPrice,
    sortBy,
    page,
    limit,
  });

  return NextResponse.json(products);
}

export type { Product };
