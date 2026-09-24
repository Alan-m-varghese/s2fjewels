import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdminProductActions from '@/components/admin/AdminProductActions';
import { Plus, Package } from 'lucide-react';

export const revalidate = 0;

const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Solitaire Diamond Ring 18K Gold',
    slug: 'solitaire-diamond-ring-18k-gold',
    price: 49999,
    stock: 15,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Rings', slug: 'rings' },
  },
  {
    id: 'prod-2',
    name: 'Royal Heritage Emerald Choker Necklace',
    slug: 'royal-heritage-emerald-choker-necklace',
    price: 89999,
    stock: 8,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Necklaces', slug: 'necklaces' },
  },
  {
    id: 'prod-3',
    name: 'Classic Rose Gold Diamond Hoop Earrings',
    slug: 'classic-rose-gold-diamond-hoop-earrings',
    price: 24999,
    stock: 25,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Earrings', slug: 'earrings' },
  },
  {
    id: 'prod-4',
    name: 'Vedic Gold Temple Bangle Bracelet',
    slug: 'vedic-gold-temple-bangle-bracelet',
    price: 65499,
    stock: 12,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    category: { name: 'Bracelets', slug: 'bracelets' },
  },
];

export default async function AdminProductsPage() {
  let products = FALLBACK_PRODUCTS as any[];

  try {
    const dbProducts = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    if (dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        ...p,
        price: Number(p.price),
      })) as any;
    }
  } catch (err) {
    console.warn('Database fallback loaded for AdminProductsPage.');
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-100">Product Management</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage luxury jewelry items, stock levels, and Supabase images.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Piece</span>
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Package className="w-12 h-12 text-amber-400 mx-auto" />
            <p className="text-neutral-400 text-sm">No products in catalog yet.</p>
            <Link
              href="/admin/products/new"
              className="inline-block bg-amber-500 text-neutral-950 font-bold px-6 py-2 rounded-lg text-xs uppercase"
            >
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="text-xs uppercase bg-neutral-950 text-neutral-400">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {products.map((product) => {
                  const image = product.images && product.images.length > 0 ? product.images[0] : '';
                  return (
                    <tr key={product.id} className="hover:bg-neutral-800/50">
                      <td className="px-4 py-3 flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                          {image && <img src={image} alt={product.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-100 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-neutral-400 font-mono">{product.slug}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className="bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700">
                          {product.category?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-amber-400">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`font-semibold ${product.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            product.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <AdminProductActions productId={product.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
