import React from 'react';
import Link from 'next/link';
import { Lock, Award, RefreshCw, Mail, Phone, MapPin, Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF4F0] text-[#3A2526] pt-16 pb-12 border-t border-[#EFE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs pb-12 border-b border-[#EFE3DA]">
        
        {/* Column 1: Brand & Contact Info */}
        <div className="space-y-4">
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

          <div className="space-y-2 pt-2 text-[#5C3637] font-medium text-[11px]">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#5C3637] shrink-0" />
              <span>+91 90378 12684</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#5C3637] shrink-0" />
              <span>support@s2fjewels.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#5C3637] shrink-0" />
              <span>S2F Jewels, Kerala, India</span>
            </div>
          </div>
        </div>

        {/* Column 2: SHOP CATEGORIES */}
        <div className="space-y-3">
          <h4 className="font-semibold text-[#5C3637] tracking-widest uppercase text-[10px]">SHOP CATEGORIES</h4>
          <ul className="space-y-2 text-[#8C6B6D]">
            <li><Link href="/products" className="hover:text-[#3A2526]">All Jewelry</Link></li>
            <li><Link href="/products?category=necklaces" className="hover:text-[#3A2526]">Necklace</Link></li>
            <li><Link href="/products?category=long-chains" className="hover:text-[#3A2526]">Long Chains</Link></li>
            <li><Link href="/products?category=bangles" className="hover:text-[#3A2526]">Bangles</Link></li>
            <li><Link href="/products?category=bracelets" className="hover:text-[#3A2526]">Bracelets</Link></li>
            <li><Link href="/products?category=anklets" className="hover:text-[#3A2526]">Anklets</Link></li>
            <li><Link href="/products?category=earrings" className="hover:text-[#3A2526]">Earings</Link></li>
            <li><Link href="/products?category=rings" className="hover:text-[#3A2526]">Rings</Link></li>
            <li><Link href="/products?category=combo-set" className="hover:text-[#3A2526]">Combo Set</Link></li>
          </ul>
        </div>

        {/* Column 3: CUSTOMER CARE & LEGAL POLICIES */}
        <div className="space-y-3">
          <h4 className="font-semibold text-[#5C3637] tracking-widest uppercase text-[10px]">CUSTOMER CARE & LEGAL</h4>
          <ul className="space-y-2 text-[#8C6B6D]">
            <li><Link href="/contact-us" className="hover:text-[#3A2526]">Contact Us</Link></li>
            <li><Link href="/shipping-and-delivery-policy" className="hover:text-[#3A2526]">Shipping & Delivery Policy</Link></li>
            <li><Link href="/cancellation-and-refund-policy" className="hover:text-[#3A2526]">Cancellation & Refund Policy</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-[#3A2526]">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-[#3A2526]">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 4: Value Pillars */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-4 h-4 text-[#5C3637] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#3A2526] uppercase text-[10px] tracking-wider">SECURE PAYMENTS</h5>
              <p className="text-[11px] text-[#8C6B6D]">Razorpay SSL 256-bit Encrypted</p>
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
            <Truck className="w-4 h-4 text-[#5C3637] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#3A2526] uppercase text-[10px] tracking-wider">PAN INDIA SHIPPING</h5>
              <p className="text-[11px] text-[#8C6B6D]">Insured delivery with tracking</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <RefreshCw className="w-4 h-4 text-[#5C3637] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#3A2526] uppercase text-[10px] tracking-wider">CANCELLATION & REFUNDS</h5>
              <p className="text-[11px] text-[#8C6B6D]">Transparent policies</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C6B6D] space-y-2 sm:space-y-0">
        <p>© 2026 S2F Jewels. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link href="/contact-us" className="hover:text-[#3A2526]">Contact Us</Link>
          <span>|</span>
          <Link href="/shipping-and-delivery-policy" className="hover:text-[#3A2526]">Shipping Policy</Link>
          <span>|</span>
          <Link href="/cancellation-and-refund-policy" className="hover:text-[#3A2526]">Refund Policy</Link>
          <span>|</span>
          <Link href="/privacy-policy" className="hover:text-[#3A2526]">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms-of-service" className="hover:text-[#3A2526]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

