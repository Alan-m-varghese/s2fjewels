'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, MessageSquare, MapPin, ExternalLink } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number | string;
  product: { name: string; images: string[] };
}

interface Order {
  id: string;
  totalAmount: number | string;
  status: string;
  createdAt: string;
  user: { name: string; email: string; phone?: string | null };
  address?: { line1: string; city: string; state: string; postalCode: string } | null;
  orderItems: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-100">Order Management</h1>
        <p className="text-sm text-neutral-400 mt-1">Track store customer orders, payment status, and dispatch tracking.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-8">No customer orders recorded yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-wrap justify-between items-center border-b border-neutral-800 pb-4 gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 font-mono">ORDER #{order.id}</span>
                    <p className="text-xs text-neutral-500">
                      Placed on {new Date(order.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-neutral-400 font-medium">Status:</span>
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg border focus:outline-none ${
                        order.status === 'PAID'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : order.status === 'SHIPPED'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : order.status === 'DELIVERED'
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <option value="PENDING" className="bg-neutral-900 text-amber-400">PENDING</option>
                      <option value="PAID" className="bg-neutral-900 text-emerald-400">PAID</option>
                      <option value="SHIPPED" className="bg-neutral-900 text-blue-400">SHIPPED</option>
                      <option value="DELIVERED" className="bg-neutral-900 text-purple-400">DELIVERED</option>
                      <option value="CANCELLED" className="bg-neutral-900 text-rose-400">CANCELLED</option>
                    </select>
                    {updatingId === order.id && <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Customer Info & Address */}
                  <div className="space-y-2">
                    <p className="font-semibold text-neutral-200">Customer: {order.user.name}</p>
                    <p className="text-xs text-neutral-400">Email: {order.user.email}</p>
                    {order.user.phone && <p className="text-xs text-neutral-400">Phone: {order.user.phone}</p>}

                    {order.address && (
                      <div className="mt-2 text-xs text-neutral-400 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                        <span className="font-semibold text-neutral-300 flex items-center mb-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 mr-1" /> Delivery Address
                        </span>
                        <p>{order.address.line1}, {order.address.city}, {order.address.state} - {order.address.postalCode}</p>
                      </div>
                    )}
                  </div>

                  {/* Order Items & Total */}
                  <div className="space-y-2">
                    <span className="font-semibold text-neutral-300 text-xs uppercase tracking-wider block">Items Purchased:</span>
                    <div className="space-y-1">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span className="text-neutral-300">{item.product.name} (x{item.quantity})</span>
                          <span className="font-semibold text-neutral-200">₹{(Number(item.priceAtPurchase) * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex justify-between items-center">
                      <span className="text-xs text-neutral-400">Total Order Amount</span>
                      <span className="text-base font-bold text-amber-400">₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
