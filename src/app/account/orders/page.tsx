import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Package, ArrowRight, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function CustomerOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/account/orders');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      orderItems: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-neutral-800 pb-6 mb-8">
        <h1 className="font-serif text-3xl font-bold text-neutral-100">My Order History</h1>
        <p className="text-sm text-neutral-400 mt-1">View past jewelry purchases and tracking status.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-lg font-semibold text-neutral-200">No Orders Found</h2>
          <p className="text-neutral-400 text-sm">You haven't placed any fine jewelry orders yet.</p>
          <Link
            href="/products"
            className="inline-block bg-amber-500 text-neutral-950 font-bold px-6 py-2.5 rounded-lg hover:bg-amber-400 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <div className="flex flex-wrap justify-between items-center border-b border-neutral-800 pb-4 gap-2">
                <div>
                  <span className="text-xs text-neutral-400 font-mono">ORDER #{order.id}</span>
                  <p className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      order.status === 'PAID'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : order.status === 'SHIPPED'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : order.status === 'DELIVERED'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {order.status}
                  </span>
                  <Link
                    href={`/orders/${order.id}/confirmation`}
                    className="text-xs font-semibold text-amber-400 hover:underline flex items-center"
                  >
                    View Details <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-neutral-200">{item.product.name} x{item.quantity}</span>
                    <span className="font-semibold text-neutral-300">₹{(Number(item.priceAtPurchase) * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex justify-between items-center">
                <span className="text-xs text-neutral-400">Payment Status: <strong className="text-neutral-200">{order.paymentStatus || 'COMPLETED'}</strong></span>
                <span className="text-base font-bold text-amber-400">Total: ₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
