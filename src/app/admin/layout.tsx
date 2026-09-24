import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Package, Tag, ShoppingCart, Store, Gem, ShieldAlert } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Admin Header Logo */}
          <div className="flex items-center space-x-3 border-b border-neutral-800 pb-4">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-amber-400">ADMIN PANEL</h2>
              <p className="text-[10px] text-neutral-400 tracking-wider">S2F JEWELS CONTROL</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Products</span>
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Categories</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>Orders</span>
            </Link>
          </nav>
        </div>

        {/* Return to Storefront */}
        <div className="pt-6 border-t border-neutral-800">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>← Back to Public Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
