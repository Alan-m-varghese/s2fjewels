import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/products/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const revalidate = 0;

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  };
}

const FALLBACK_CATEGORIES = [
  { id: 'cat-1', name: 'Rings', slug: 'rings', _count: { products: 1 } },
  { id: 'cat-2', name: 'Necklaces', slug: 'necklaces', _count: { products: 1 } },
  { id: 'cat-3', name: 'Earrings', slug: 'earrings', _count: { products: 1 } },
  { id: 'cat-4', name: 'Bracelets', slug: 'bracelets', _count: { products: 1 } },
];

const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Royal Solitaire Diamond Ring 18K',
    slug: 'royal-solitaire-diamond-ring-18k',
    price: 49999,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Rings', slug: 'rings' },
  },
  {
    id: 'prod-2',
    name: 'Imperial Emerald & Diamond Pendant',
    slug: 'imperial-emerald-diamond-pendant',
    price: 89999,
    stock: 5,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Necklaces', slug: 'necklaces' },
  },
  {
    id: 'prod-3',
    name: 'Classic Diamond Stud Earrings 22K',
    slug: 'classic-diamond-stud-earrings-22k',
    price: 34999,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Earrings', slug: 'earrings' },
  },
  {
    id: 'prod-4',
    name: 'Heritage Crafted Gold Bangles Pair',
    slug: 'heritage-crafted-gold-bangles-pair',
    price: 124999,
    stock: 4,
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Bracelets', slug: 'bracelets' },
  },
];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const categorySlug = searchParams.category;
  const search = searchParams.search;
  const sort = searchParams.sort || 'latest';
  const currentPage = parseInt(searchParams.page || '1', 10);
  const pageSize = 12;

  let categories: any[] = [];
  let products: any[] = [];
  let totalCount = 0;

  try {
    const fetchedCategories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    categories = fetchedCategories as any;

    const where: any = {
      status: 'ACTIVE',
    };

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { price: 'desc' };
    }

    totalCount = await prisma.product.count({ where });

    const dbProducts = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });

    products = dbProducts.map((p) => ({
      ...p,
      price: Number(p.price),
    })) as any;
  } catch (err) {
    console.warn('Database error, loading fallback for ProductsPage:', err);
    categories = FALLBACK_CATEGORIES as any;
    products = FALLBACK_PRODUCTS as any;
    totalCount = FALLBACK_PRODUCTS.length;
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-[#FAF4F0] min-h-screen py-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#3A2526] italic">
            Fine Jewelry Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#8C6B6D] font-normal">
            Handcrafted hallmarked gold jewelry, solitaires, and heritage creations.
          </p>
        </div>

        {/* Top Filter Bar (Dropdown Option Form) */}
        <div className="bg-[#F5EBE4] border border-[#EFE3DA] rounded-2xl p-4 sm:p-5 shadow-sm">
          <form method="GET" className="flex flex-wrap items-center justify-between gap-4">
            {search && <input type="hidden" name="search" value={search} />}

            {/* Left Controls: Category & Sort Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* Category Dropdown Option */}
              <div className="flex items-center space-x-2">
                <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-[#5C3637] flex items-center space-x-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Category:</span>
                </label>
                <select
                  name="category"
                  defaultValue={categorySlug || ''}
                  className="bg-white border border-[#EFE3DA] text-[#3A2526] rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-[#5C3637] shadow-sm cursor-pointer"
                >
                  <option value="">All Categories ({categories.reduce((acc, c) => acc + (c._count?.products || 0), 0)})</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name} ({cat._count?.products || 0})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown Option */}
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-[#5C3637] flex items-center space-x-1 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Sort By:</span>
                </label>
                <select
                  name="sort"
                  defaultValue={sort}
                  className="bg-white border border-[#EFE3DA] text-[#3A2526] rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-[#5C3637] shadow-sm cursor-pointer"
                >
                  <option value="latest">Latest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Filter Submit Button */}
              <button
                type="submit"
                className="bg-[#5C3637] hover:bg-[#422627] text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>

            {/* Right Side: Pieces Count */}
            <div className="text-xs text-[#8C6B6D] font-medium">
              Showing <strong className="text-[#3A2526] font-bold">{products.length}</strong> of{' '}
              <strong className="text-[#3A2526] font-bold">{totalCount}</strong> pieces
            </div>

          </form>
        </div>

        {/* Product Grid Area (Full Width 4 Columns on Desktop) */}
        {products.length === 0 ? (
          <div className="bg-[#F5EBE4] border border-[#EFE3DA] rounded-2xl p-12 text-center space-y-4">
            <p className="text-[#8C6B6D] text-sm font-medium">No jewelry items found matching your filter criteria.</p>
            <Link
              href="/products"
              className="inline-block bg-[#5C3637] text-white font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded-xl hover:bg-[#422627] transition-colors shadow-sm"
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 pt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link
                key={i}
                href={`/products?page=${i + 1}${categorySlug ? `&category=${categorySlug}` : ''}${
                  search ? `&search=${search}` : ''
                }`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#5C3637] text-white shadow-sm'
                    : 'bg-white border border-[#EFE3DA] text-[#3A2526] hover:bg-[#F5EBE4]'
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
