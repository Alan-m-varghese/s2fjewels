'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/components/cart/CartContext';
import { ShieldCheck, Lock, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [address, setAddress] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: session?.user?.phone || '',
    line1: '12 Luxury Boulevard, Bandra',
    line2: 'Suite 402',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India',
  });

  const formattedTotal = cartTotal.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!session?.user) {
      router.push('/login?callbackUrl=/checkout');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const createRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          address,
        }),
      });

      const orderData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(orderData.error || 'Failed to initialize order');
      }

      const { orderId, razorpayOrderId, amountPaise, key } = orderData;
      const isScriptLoaded = await loadRazorpayScript();

      if (isScriptLoaded && (window as any).Razorpay && !key.includes('placeholder')) {
        const options = {
          key: key,
          amount: amountPaise,
          currency: 'INR',
          name: 'S2F JEWELS',
          description: `Payment for Order #${orderId.slice(-6)}`,
          order_id: razorpayOrderId,
          prefill: {
            name: address.name,
            email: address.email,
            contact: address.phone,
          },
          theme: { color: '#b45309' },
          handler: async function (response: any) {
            const verifyRes = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              clearCart();
              router.push(`/orders/${orderId}/confirmation`);
            } else {
              setError('Payment verification failed.');
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        const verifyRes = await fetch('/api/orders/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            razorpayOrderId: razorpayOrderId || `rzp_order_mock_${orderId}`,
            razorpayPaymentId: `pay_test_${Date.now()}`,
            razorpaySignature: 'mock_signature',
          }),
        });

        if (verifyRes.ok) {
          clearCart();
          router.push(`/orders/${orderId}/confirmation`);
        } else {
          setError('Payment verification failed in test mode');
          setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during payment processing.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-xs font-bold text-stone-500 hover:text-amber-800 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Bag
          </button>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Checkout & Delivery</h1>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium">
            {error}
          </div>
        )}

        {!session?.user && (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-900">Account Required to Place Order</h3>
              <p className="text-xs text-stone-600 mt-1 font-medium">
                Please sign in or create an account to securely confirm your order and receive WhatsApp tracking updates.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={() => router.push('/login?callbackUrl=/checkout')}
                className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center">
                <Lock className="w-4 h-4 text-amber-800 mr-2" />
                1. Delivery Address & Contact
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-stone-700 mb-1 font-semibold text-xs">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:border-amber-700 focus:outline-none"
                    placeholder="Riya Sharma"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold text-xs">Email Address</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:border-amber-700 focus:outline-none"
                    placeholder="riya@example.com"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold text-xs">Mobile Phone (WhatsApp Updates)</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:border-amber-700 focus:outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold text-xs">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:border-amber-700 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 mb-1 font-semibold text-xs">Flat, House No., Building, Street</label>
                  <input
                    type="text"
                    required
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:border-amber-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3 text-sm shadow-sm">
              <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center">
                <CreditCard className="w-4 h-4 text-amber-800 mr-2" />
                2. Payment Method
              </h2>
              <div className="p-4 rounded-xl bg-white border border-amber-300 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-amber-700"></div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">Razorpay Secure Online Payment</p>
                    <p className="text-xs text-stone-500 font-medium">UPI, Cards, NetBanking, Wallets</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                  Instant Verification
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-3">
                Order Items ({items.length})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-xs text-stone-700">
                    <span className="line-clamp-1 flex-1 pr-2 font-medium">
                      {product.name} x{quantity}
                    </span>
                    <span className="font-bold text-stone-900">
                      ₹{(Number(product.price) * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>Insured Express Courier</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Payable</span>
                  <span className="text-amber-800 text-xl font-serif">{formattedTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-2xl text-center text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-700/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay {formattedTotal} via Razorpay</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
