import React from 'react';
import Link from 'next/link';
import { Lock, Award, RefreshCw, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF4F0] text-[#3A2526] pt-16 pb-12 border-t border-[#EFE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 text-xs pb-12 border-b border-[#EFE3DA]">
        
        {/* Column 1: Brand & Tagline */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/images/s2f_logo.png"
              alt="S2F Jewels Logo"
              className="w-10 h-10 object-contain rounded-full border border-[#EFE3DA] shadow-sm mix-blend-multiply shrink-0"
            />
            <div>
              <span className="font-serif text-lg font-medium tracking-[0.2em] text-[#3A2526] uppercase block leading-none">
                S2F JEWELS
              </span>
              <span className="text-[8px] tracking-[0.25em] text-[#8C6B6D] uppercase block mt-1 font-semibold">
                HAUTE JOAILLERIE
              </span>
            </div>
          </Link>

          <p className="text-[#8C6B6D] text-xs leading-relaxed">
            Timeless jewelry, meaningful moments. Handcrafted fine creations designed for life&apos;s memories.
          </p>

          <div className="flex items-center space-x-3 text-[#5C3637] pt-1">
            <span className="w-7 h-7 rounded-full bg-white border border-[#EFE3DA] flex items-center justify-center font-bold text-[10px]">IG</span>
            <span className="w-7 h-7 rounded-full bg-white border border-[#EFE3DA] flex items-center justify-center font-bold text-[10px]">FB</span>
            <span className="w-7 h-7 rounded-full bg-white border border-[#EFE3DA] flex items-center justify-center font-bold text-[10px]">PT</span>
            <span className="w-7 h-7 rounded-full bg-white border border-[#EFE3DA] flex items-center justify-center font-bold text-[10px]">TK</span>
          </div>
        </div>

        {/* Column 2: SHOP */}
        <div className="space-y-3">
          <h4 className="font-semibold text-[#5C3637] tracking-widest uppercase text-[10px]">SHOP</h4>
          <ul className="space-y-2 text-[#8C6B6D]">
            <li><Link href="/products" className="hover:text-[#3A2526]">All Jewelry</Link></li>
            <li><Link href="/products?category=necklaces" className="hover:text-[#3A2526]">Necklaces</Link></li>
            <li><Link href="/products?category=earrings" className="hover:text-[#3A2526]">Earrings</Link></li>
            <li><Link href="/products?category=rings" className="hover:text-[#3A2526]">Rings</Link></li>
            <li><Link href="/products?category=bracelets" className="hover:text-[#3A2526]">Bracelets</Link></li>
            <li><Link href="/products?category=rings" className="hover:text-[#3A2526]">Gifts</Link></li>
          </ul>
        </div>

        {/* Column 3: COLLECTIONS */}
        <div className="space-y-3">
          <h4 className="font-semibold text-[#5C3637] tracking-widest uppercase text-[10px]">COLLECTIONS</h4>
          <ul className="space-y-2 text-[#8C6B6D]">
            <li><Link href="/products?category=necklaces" className="hover:text-[#3A2526]">Petal & Pearl</Link></li>
            <li><Link href="/products?category=rings" className="hover:text-[#3A2526]">Golden Romance</Link></li>
            <li><Link href="/products?category=earrings" className="hover:text-[#3A2526]">Celestial Glow</Link></li>
            <li><Link href="/products?category=bracelets" className="hover:text-[#3A2526]">Minimal Muse</Link></li>
            <li><Link href="/products?category=necklaces" className="hover:text-[#3A2526]">Wedding</Link></li>
          </ul>
        </div>

        {/* Column 4: HELP & ABOUT */}
        <div className="space-y-3">
          <h4 className="font-semibold text-[#5C3637] tracking-widest uppercase text-[10px]">HELP & ABOUT</h4>
          <ul className="space-y-2 text-[#8C6B6D]">
            <li><Link href="/#our-story" className="hover:text-[#3A2526]">Our Story</Link></li>
            <li><Link href="/account/orders" className="hover:text-[#3A2526]">Shipping & Delivery</Link></li>
            <li><Link href="/account/orders" className="hover:text-[#3A2526]">Returns & Exchanges</Link></li>
            <li><Link href="/cart" className="hover:text-[#3A2526]">Care Guide</Link></li>
            <li><Link href="/#our-story" className="hover:text-[#3A2526]">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 5: Value Pillars (Strictly NO free shipping / offers!) */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-4 h-4 text-[#5C3637] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#3A2526] uppercase text-[10px] tracking-wider">SECURE PAYMENTS</h5>
              <p className="text-[11px] text-[#8C6B6D]">Safe & encrypted</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Award className="w-4 h-4 text-[#5C3637] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#3A2526] uppercase text-[10px] tracking-wider">PREMIUM QUALITY</h5>
              <p className="text-[11px] text-[#8C6B6D]">Crafted to last a lifetime</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <RefreshCw className="w-4 h-4 text-[#5C3637] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#3A2526] uppercase text-[10px] tracking-wider">30-DAY RETURNS</h5>
              <p className="text-[11px] text-[#8C6B6D]">Hassle-free exchanges</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C6B6D] space-y-2 sm:space-y-0">
        <p>© 2026 S2F Jewels. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <Link href="/products" className="hover:text-[#3A2526]">Privacy Policy</Link>
          <span>|</span>
          <Link href="/products" className="hover:text-[#3A2526]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
