'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartContext';
import { ShoppingBag, Award, ShieldCheck, Truck, ArrowLeft, Check, Plus, Minus, Share2 } from 'lucide-react';

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category?: { name: string; slug: string } | null;
    variants?: Array<{ id: string; name: string; value: string; priceOverride?: number | null }>;
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const formattedPrice = Number(product.price).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center">
                <span className="bg-rose-500 text-white font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-neutral-900 ${
                    selectedImage === img
                      ? 'border-amber-500 ring-2 ring-amber-500/30'
                      : 'border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta & Purchasing Options */}
        <div className="space-y-6">
          <div>
            {product.category && (
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-xs uppercase tracking-widest text-amber-400 font-semibold"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-100 mt-1">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-amber-400 mt-4">{formattedPrice}</p>
            <p className="text-xs text-neutral-400 mt-1">Includes all taxes & insured door delivery</p>
          </div>

          {/* Stock Info */}
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-neutral-400">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-emerald-400 font-semibold flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping"></span>
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-rose-400 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-b border-neutral-800 py-6">
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2">
              Description & Craftsmanship
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-400 font-medium">Quantity:</span>
              <div className="flex items-center border border-neutral-800 rounded-lg bg-neutral-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-neutral-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : product.stock <= 0
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
            <div className="flex flex-col items-center space-y-1">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-neutral-200">100% Certified</span>
              <span className="text-neutral-500">Hallmarked Purity</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Truck className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-neutral-200">Insured Delivery</span>
              <span className="text-neutral-500">Tamper-evident Box</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-neutral-200">Lifetime Guarantee</span>
              <span className="text-neutral-500">Free Polishing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
