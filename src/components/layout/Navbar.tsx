'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/components/cart/CartContext';
import { Search, ShoppingBag, User, LogOut, Menu, X, Heart, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 bg-[#FAF4F0] border-b border-[#EFE3DA]">
      {/* Top Subtle Announcement Bar (Strictly NO free shipping / offers) */}
      <div className="bg-[#5C3637] text-[#FAF4F0] py-1.5 px-4 text-[11px] font-medium tracking-widest text-center uppercase">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="w-3 h-3 text-[#EFE3DA] fill-[#EFE3DA]" />
          <span>Handcrafted Fine Jewelry • Timeless Elegance & Heritage Artistry</span>
          <Heart className="w-3 h-3 text-[#EFE3DA] fill-[#EFE3DA]" />
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Side Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider text-[#5C3637] uppercase">
            <Link href="/products" className="hover:text-[#4A2B2C] transition-colors">
              SHOP ▾
            </Link>
            <Link href="/#collections" className="hover:text-[#4A2B2C] transition-colors">
              COLLECTIONS
            </Link>
            <Link href="/products?category=rings" className="hover:text-[#4A2B2C] transition-colors">
              GIFTS
            </Link>
            <Link href="/#our-story" className="hover:text-[#4A2B2C] transition-colors">
              ABOUT
            </Link>
          </nav>

          {/* Center Brand Logo (S2F JEWELS with exact user logo emblem) */}
          <Link href="/" className="flex items-center space-x-3 group my-auto">
            <img
              src="/images/s2f_logo.png"
              alt="S2F Jewels Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full border border-[#EFE3DA]/60 shadow-sm mix-blend-multiply shrink-0"
            />
            <div className="flex flex-col items-start text-left">
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.2em] text-[#3A2526] group-hover:text-[#5C3637] transition-colors uppercase leading-none">
                S2F JEWELS
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#8C6B6D] uppercase font-semibold block mt-1">

              </span>
            </div>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold bg-[#EFE3DA] text-[#5C3637] hover:bg-[#E5D5C9] transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>ADMIN</span>
              </Link>
            )}

            {/* Search Icon Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-[#5C3637] hover:text-[#3A2526] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-1.5 text-[#5C3637] hover:text-[#3A2526] transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#FFFFFF] border border-[#EFE3DA] rounded-2xl shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-[#FAF4F0]">
                      <p className="font-bold text-[#3A2526]">{session.user.name}</p>
                      <p className="text-[#8C6B6D] truncate">{session.user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-[#5C3637] hover:bg-[#FAF4F0] font-semibold"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-[#5C3637] hover:bg-[#FAF4F0]"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full text-left px-4 py-2 text-rose-800 hover:bg-rose-50 flex items-center space-x-1 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-1" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-1.5 text-[#5C3637] hover:text-[#3A2526] transition-colors"
                aria-label="Account Login"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Shopping Bag with Badge */}
            <Link
              href="/cart"
              className="relative p-1.5 text-[#5C3637] hover:text-[#3A2526] transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5C3637] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#5C3637]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-4 relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search necklaces, rings, fine gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#EFE3DA] rounded-full py-2 pl-4 pr-10 text-xs text-[#3A2526] placeholder-[#8C6B6D] focus:outline-none focus:border-[#5C3637]"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-[#5C3637]">
              <Search className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#EFE3DA] px-6 py-6 space-y-4 text-xs font-semibold uppercase tracking-wider text-[#5C3637]">
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF4F0]">
            SHOP ALL JEWELRY
          </Link>
          <Link href="/#collections" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF4F0]">
            CURATED COLLECTIONS
          </Link>
          <Link href="/products?category=rings" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF4F0]">
            FINE GIFTS
          </Link>
          <Link href="/#our-story" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            OUR STORY & HERITAGE
          </Link>
        </div>
      )}
    </header>
  );
}
