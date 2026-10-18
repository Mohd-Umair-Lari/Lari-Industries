import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();
  const featured = searchParams.get('featured');

  let filtered = [...products];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.specs.application.toLowerCase().includes(search)
    );
  }

  if (featured === 'true') {
    filtered = filtered.filter(p => p.isFeatured || p.isBestseller);
  }

  return NextResponse.json({
    total: filtered.length,
    products: filtered,
  });
}
