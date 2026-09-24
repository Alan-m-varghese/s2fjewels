import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error: any) {
    console.warn('Database fallback loaded for GET /api/categories');
    return NextResponse.json([
      { id: 'cat-1', name: 'Rings', slug: 'rings', _count: { products: 1 } },
      { id: 'cat-2', name: 'Necklaces', slug: 'necklaces', _count: { products: 1 } },
      { id: 'cat-3', name: 'Earrings', slug: 'earrings', _count: { products: 1 } },
      { id: 'cat-4', name: 'Bracelets', slug: 'bracelets', _count: { products: 1 } },
    ]);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required.' }, { status: 400 });
    }

    const formattedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const category = await prisma.category.create({
      data: {
        name,
        slug: formattedSlug,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
