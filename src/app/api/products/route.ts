import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ProductStatus } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (status) {
      where.status = status as ProductStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const body = await req.json();
    const { name, slug, description, price, stock, categoryId, images, status, variants } = body;

    if (!name || !description || price === undefined || stock === undefined || !categoryId) {
      return NextResponse.json({ error: 'Missing required product fields.' }, { status: 400 });
    }

    const generatedSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
      : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const product = await prisma.product.create({
      data: {
        name,
        slug: `${generatedSlug}-${Date.now().toString().slice(-4)}`,
        description,
        price: parseFloat(price.toString()),
        stock: parseInt(stock.toString()),
        categoryId,
        images: Array.isArray(images) ? images : [],
        status: (status as ProductStatus) || ProductStatus.ACTIVE,
        variants: variants && Array.isArray(variants) ? {
          create: variants.map((v: any) => ({
            name: v.name,
            value: v.value,
            priceOverride: v.priceOverride ? parseFloat(v.priceOverride) : null,
            stock: parseInt(v.stock || stock),
          }))
        } : undefined,
      },
      include: {
        category: true,
        variants: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
