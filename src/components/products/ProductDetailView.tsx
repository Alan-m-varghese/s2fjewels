'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartContext';
import { ShoppingBag, Star, ShieldCheck, Award, RefreshCw, Truck, Heart, ArrowRight } from 'lucide-react';

interface ProductDetailViewProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category?: { name: string; slug: string } | null;
  };
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const formattedPrice = product.price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      images: product.images,
      stock: product.stock,
    });
    router.push('/checkout');
  };

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white">
      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="aspect-square bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden shadow-sm relative">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <span className="absolute top-4 left-4 bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center">
            <Award className="w-3.5 h-3.5 mr-1" /> BIS Hallmarked
          </span>
        </div>

        {images.length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === i ? 'border-amber-700 shadow-md' : 'border-stone-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information Section */}
      <div className="space-y-6">
        <div>
          {product.category && (
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold mb-1 block">
              {product.category.name}
            </span>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center space-x-3 mt-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
            <span className="text-xs font-semibold text-stone-600">(4.9/5 from 84 Connoisseurs)</span>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
          <span className="text-xs text-stone-500 font-medium">Inclusive of all taxes & insurance</span>
          <div className="flex items-baseline space-x-3">
            <span className="font-serif text-3xl font-bold text-stone-900">{formattedPrice}</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              In Stock ({product.stock} available)
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-stone-600 text-sm leading-relaxed font-medium">
          {product.description || 'Masterpiece fine jewelry creation finished in hallmarked gold and certified natural diamonds.'}
        </p>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  images: product.images,
                  stock: product.stock,
                })
              }
              className="py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-2xl text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-700/20 transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-2xl text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="grid grid-cols-2 gap-4 border-t border-stone-200 pt-6 text-xs text-stone-700">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <span>BIS Hallmarked Gold</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Free Insured Express Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Lifetime Exchange Policy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-700 shrink-0" />
            <span>SGL/IGI Certificate Included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
