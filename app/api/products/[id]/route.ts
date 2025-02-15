import { NextResponse } from 'next/server';
import { MockDataService } from '../../../../lib/mock-data';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const mockDataService = new MockDataService();
  const { id } = params;
  const product = await mockDataService.getProductById(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}