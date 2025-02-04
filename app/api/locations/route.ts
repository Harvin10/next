import { NextRequest, NextResponse } from 'next/server';
import { MockDataService } from '../../lib/mock-data';

const dataService = new MockDataService();

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const locations = await dataService.getLocations(query);
  return NextResponse.json(locations);
}
