'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartContext';
import { Heart, Star } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | string;
    stock: number;
    images: string[];
    category?: { name: string; slug: string } | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);

  const formattedPrice = Number(product.price).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="group bg-[#F7F1EC] border border-[#EFE3DA] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-3">
      <div className="space-y-3">
        {/* Image Container */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF4F0]">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Wishlist Heart Icon */}
          <button
            onClick={() => setWished(!wished)}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#EFE3DA] flex items-center justify-center text-[#5C3637] shadow-sm hover:scale-110 transition-transform"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wished ? 'fill-[#5C3637] text-[#5C3637]' : ''}`} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-1 px-1 text-center">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-sm font-normal text-[#3A2526] group-hover:text-[#5C3637] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex justify-center items-center space-x-0.5 text-amber-500 text-[10px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </div>

          <p className="font-sans text-xs font-semibold text-[#3A2526] pt-1">{formattedPrice}</p>
        </div>
      </div>

      {/* Quick Add Button */}
      <div className="pt-3 px-1">
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: Number(product.price),
              images: product.images,
              stock: product.stock,
            })
          }
          className="w-full py-2 bg-[#5C3637] hover:bg-[#422627] text-white font-semibold text-[11px] tracking-wider uppercase rounded-lg transition-colors shadow-sm"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}
