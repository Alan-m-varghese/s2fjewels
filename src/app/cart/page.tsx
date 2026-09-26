'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, cartTotal, deliveryFee, grandTotal } = useCart();

  const formattedSubtotal = cartTotal.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const formattedGrandTotal = grandTotal.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md text-center space-y-6 bg-stone-50 border border-stone-200 rounded-3xl p-8 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-stone-600 font-medium">Explore our handcrafted fine jewelry collection and add certified gold & solitaire creations.</p>
          <Link
            href="/products"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            Explore Fine Jewelry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-stone-200 pb-4">
          <h1 className="font-serif text-3xl font-bold text-stone-900">Your Shopping Bag ({items.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-white border border-stone-200 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : ''}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base">{product.name}</h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">22K / 18K Certified Gold</p>
                    <span className="font-serif font-bold text-stone-900 block mt-1">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-200">
                  <div className="flex items-center border border-stone-300 rounded-full bg-white px-3 py-1">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 text-stone-500 hover:text-stone-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-stone-900 text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 text-stone-500 hover:text-stone-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="space-y-6">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-amber-900 font-bold">₹100</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-amber-800 text-xl font-serif">{formattedGrandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-2xl text-center text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-700/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs text-stone-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>100% Safe & Insured Razorpay Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
