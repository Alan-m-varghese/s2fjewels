import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';

export const revalidate = 0;

const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Solitaire Diamond Ring 18K Gold',
    slug: 'solitaire-diamond-ring-18k-gold',
    description: 'Masterpiece 1-carat brilliant cut natural solitaire ring crafted in certified 18k solid gold. Hallmarked by BIS with SGL authenticity certificate.',
    price: 49999,
    stock: 15,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cat-1',
  },
  {
    id: 'prod-2',
    name: 'Royal Heritage Emerald Choker Necklace',
    slug: 'royal-heritage-emerald-choker-necklace',
    description: 'Heritage royal emerald pendant surrounded by brilliant pavé diamonds. Finished in 22k yellow gold hallmark purity.',
    price: 89999,
    stock: 8,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cat-2',
  },
  {
    id: 'prod-3',
    name: 'Classic Rose Gold Diamond Hoop Earrings',
    slug: 'classic-rose-gold-diamond-hoop-earrings',
    description: 'Elegant 18k rose gold hoop earrings studded with micro-set round diamonds.',
    price: 24999,
    stock: 25,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cat-3',
  },
  {
    id: 'prod-4',
    name: 'Vedic Gold Temple Bangle Bracelet',
    slug: 'vedic-gold-temple-bangle-bracelet',
    description: 'Traditional handcrafted temple work gold bangle bracelet with detailed antique carving.',
    price: 65499,
    stock: 12,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cat-4',
  },
];

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let product: any = null;

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (dbProduct) {
      product = {
        ...dbProduct,
        price: Number(dbProduct.price),
      };
    }
  } catch (err) {
    console.warn('Database fallback loaded for EditProductPage:', err);
  }

  if (!product) {
    product = FALLBACK_PRODUCTS.find((p) => p.id === params.id || p.slug === params.id);
  }

  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} />;
}
