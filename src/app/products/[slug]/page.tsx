import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductDetailView from '@/components/products/ProductDetailView';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Royal Solitaire Diamond Ring 18K',
    slug: 'royal-solitaire-diamond-ring-18k',
    description: 'Masterpiece 1-carat brilliant cut natural solitaire ring crafted in certified 18k solid gold. Hallmarked by BIS with SGL authenticity certificate.',
    price: 49999,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
    ],
    category: { name: 'Rings', slug: 'rings' },
  },
  {
    id: 'prod-2',
    name: 'Imperial Emerald & Diamond Pendant',
    slug: 'imperial-emerald-diamond-pendant',
    description: 'Heritage royal emerald pendant surrounded by brilliant pavé diamonds. Finished in 22k yellow gold hallmark purity.',
    price: 89999,
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    ],
    category: { name: 'Necklaces', slug: 'necklaces' },
  },
];

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let product: any = null;

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    });

    if (dbProduct) {
      product = {
        ...dbProduct,
        price: Number(dbProduct.price),
      };
    }
  } catch (err) {
    console.warn('DB disconnected. Searching fallback products for slug:', params.slug);
  }

  if (!product) {
    product = FALLBACK_PRODUCTS.find((p) => p.slug === params.slug) || FALLBACK_PRODUCTS[0];
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-semibold text-stone-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Fine Jewels
        </Link>

        <ProductDetailView product={product} />
      </div>
    </div>
  );
}
