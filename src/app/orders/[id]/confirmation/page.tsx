import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CheckCircle2, Package, MapPin, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

export const revalidate = 0;

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      address: true,
      orderItems: {
        include: { product: true },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const formattedTotal = Number(order.totalAmount).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center space-y-4 relative overflow-hidden shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
          Payment Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-100">
          Thank You for Your Order!
        </h1>

        <p className="text-neutral-400 text-sm max-w-md mx-auto">
          Order <strong className="text-neutral-200">#{order.id}</strong> has been successfully placed. A WhatsApp order notification has been sent to our store manager.
        </p>

        {/* WhatsApp Banner */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 max-w-lg mx-auto flex items-center justify-center space-x-3 text-xs text-emerald-300">
          <MessageSquare className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>WhatsApp Cloud API dispatch triggered for Order #{order.id.slice(-6)}</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Items */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3 flex items-center">
            <Package className="w-4 h-4 text-amber-400 mr-2" /> Items Ordered
          </h2>

          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b border-neutral-800/60 pb-2">
                <div>
                  <p className="font-semibold text-neutral-200">{item.product.name}</p>
                  <p className="text-xs text-neutral-400">Qty: {item.quantity} x ₹{Number(item.priceAtPurchase).toLocaleString('en-IN')}</p>
                </div>
                <span className="font-bold text-amber-400">
                  ₹{(Number(item.priceAtPurchase) * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between text-base font-bold text-neutral-100">
            <span>Total Paid:</span>
            <span className="text-amber-400 text-lg">{formattedTotal}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3 flex items-center">
            <MapPin className="w-4 h-4 text-amber-400 mr-2" /> Delivery Address
          </h2>

          {order.address ? (
            <div className="text-sm text-neutral-300 space-y-1">
              <p className="font-semibold text-neutral-100">{order.user.name}</p>
              <p>{order.address.line1}</p>
              {order.address.line2 && <p>{order.address.line2}</p>}
              <p>{order.address.city}, {order.address.state} - {order.address.postalCode}</p>
              <p>{order.address.country}</p>
              <p className="text-xs text-neutral-400 pt-2">Phone: {order.user.phone || 'N/A'}</p>
            </div>
          ) : (
            <p className="text-sm text-neutral-400">Standard Insured Delivery</p>
          )}

          <div className="pt-4 border-t border-neutral-800">
            <span className="text-xs text-amber-400/80 font-medium">Razorpay Payment ID:</span>
            <p className="text-xs font-mono text-neutral-400 truncate">{order.razorpayPaymentId || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold px-8 py-3.5 rounded-full shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
