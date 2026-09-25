import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/products/ProductCard';
import { Heart, ArrowRight, Star, Award, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

const CIRCULAR_CATEGORIES = [
  {
    name: 'NECKLACES',
    slug: 'necklaces',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'EARRINGS',
    slug: 'earrings',
    img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'RINGS',
    slug: 'rings',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'BRACELETS',
    slug: 'bracelets',
    img: 'https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'FINE GIFTS',
    slug: 'rings',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'WEDDING',
    slug: 'necklaces',
    img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80',
  },
];

const CURATED_COLLECTIONS = [
  {
    title: 'Petal & Pearl',
    sub: 'COLLECTION',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    slug: 'necklaces',
  },
  {
    title: 'Golden Romance',
    sub: 'COLLECTION',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    slug: 'rings',
  },
  {
    title: 'Celestial Glow',
    sub: 'COLLECTION',
    img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80',
    slug: 'earrings',
  },
  {
    title: 'Minimal Muse',
    sub: 'COLLECTION',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    slug: 'bracelets',
  },
];

const FALLBACK_BEST_SELLERS = [
  {
    id: 'prod-1',
    name: 'Lumière Heart Necklace',
    slug: 'royal-solitaire-diamond-ring-18k',
    price: 8900,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'],
    category: { name: 'Necklaces', slug: 'necklaces' },
  },
  {
    id: 'prod-2',
    name: 'Eternal Sparkle Ring',
    slug: 'imperial-emerald-diamond-pendant',
    price: 7900,
    stock: 5,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'],
    category: { name: 'Rings', slug: 'rings' },
  },
  {
    id: 'prod-3',
    name: 'Pearl Grace Earrings',
    slug: 'classic-diamond-stud-earrings-22k',
    price: 6900,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80'],
    category: { name: 'Earrings', slug: 'earrings' },
  },
  {
    id: 'prod-4',
    name: 'Dainty Tennis Bracelet',
    slug: 'heritage-crafted-gold-bangles-pair',
    price: 9900,
    stock: 4,
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=600&q=80'],
    category: { name: 'Bracelets', slug: 'bracelets' },
  },
  {
    id: 'prod-5',
    name: 'Love Knot Ring',
    slug: 'royal-solitaire-diamond-ring-18k',
    price: 5900,
    stock: 6,
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80'],
    category: { name: 'Rings', slug: 'rings' },
  },
];

export default async function HomePage() {
  let bestSellers: any[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: { category: true },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    bestSellers = dbProducts.map((p) => ({
      ...p,
      price: Number(p.price),
    }));
  } catch (err) {
    console.warn('Database error, loading fallback for HomePage:', err);
    bestSellers = FALLBACK_BEST_SELLERS as any[];
  }

  return (
    <div className="bg-[#FAF4F0] space-y-12 sm:space-y-20 pb-16">
      
      {/* 1. HERO BANNER (BEAUTIFUL MOBILE TEXT OVERLAY & FULL-BLEED DESKTOP) */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] bg-[#F4ECE5] flex items-center overflow-hidden border-b border-[#EFE3DA]">
        
        {/* Background Model Image (Full Bleed on Desktop, Full Image on Mobile) */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full max-w-[1600px] mx-auto flex justify-end">
            <div className="w-full lg:w-[62%] h-full relative">
              <img
                src="/images/lumiere_hero_model.png"
                alt="Lumière Model wearing fine gold jewelry"
                className="w-full h-full object-cover object-top lg:object-right"
              />

              {/* Desktop Gradient Transition (Hidden on Mobile) */}
              <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#F4ECE5] via-[#F4ECE5]/80 to-transparent hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Mobile Soft Scrim Gradient Overlay (Ensures 100% Text Legibility on Mobile) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1819]/85 via-[#2A1819]/40 to-transparent lg:hidden z-10" />

        {/* Soft Floral Accents (Desktop Only) */}
        <div className="absolute top-0 left-0 w-80 h-full pointer-events-none opacity-40 mix-blend-multiply z-10 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80"
            alt="Soft Pink Roses"
            className="w-full h-full object-cover object-left opacity-30"
          />
        </div>

        {/* Content Container (Left Overlay on Desktop & Elegant Bottom Overlay on Mobile) */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full py-16 lg:py-24 flex items-end lg:items-center min-h-[500px] sm:min-h-[560px] lg:min-h-0">
          <div className="max-w-lg space-y-4 sm:space-y-6 lg:pl-4 text-left">
            
            {/* Headline */}
            <h1 className="font-normal leading-[1.05]">
              <span className="font-serif text-4xl sm:text-6xl lg:text-7xl block tracking-tight text-white lg:text-[#3A2526]">
                Made to be
              </span>
              <span className="font-serif italic font-normal text-5xl sm:text-7xl lg:text-8xl block mt-0.5 text-white lg:text-[#3A2526]">
                Cherished
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-[#EFE3DA] lg:text-[#8C6B6D] text-xs sm:text-sm font-normal tracking-wide leading-relaxed max-w-xs">
              Timeless jewelry for life&apos;s<br className="hidden sm:block" /> most beautiful moments.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-block bg-white lg:bg-[#4A2525] text-[#3A2526] lg:text-white hover:bg-[#FAF4F0] lg:hover:bg-[#381B1B] font-bold lg:font-medium text-[11px] tracking-[0.2em] uppercase px-7 py-3.5 sm:px-8 transition-all shadow-md"
              >
                SHOP THE COLLECTION
              </Link>
            </div>

          </div>
        </div>

        {/* Floating Seal Emblem (Top Right) */}
        <div className="absolute top-6 right-6 sm:right-12 lg:right-28 z-20 w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/60 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 text-[7.5px] sm:text-[9px] font-semibold tracking-widest text-[#3A2526] uppercase shadow-md">
          <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.15em] block text-[#3A2526] font-bold">TIMELESS BEAUTY</span>
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#4A2525] fill-[#4A2525] my-0.5 sm:my-1" />
          <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.15em] block text-[#3A2526] font-bold">MADE WITH LOVE</span>
        </div>

        {/* Hero Carousel Dots at Bottom Center */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white lg:bg-[#4A2525]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/50 lg:bg-[#D8C4B6]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/50 lg:bg-[#D8C4B6]"></span>
        </div>

      </section>

      {/* 2. SHOP BY CATEGORY (3 Columns on Mobile, 6 on Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[#5C3637] font-bold">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 text-center">
          {CIRCULAR_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center space-y-2"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 bg-white border border-[#EFE3DA] shadow-sm group-hover:border-[#5C3637] transition-all duration-300 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#3A2526] uppercase group-hover:text-[#5C3637] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CURATED COLLECTIONS (2 COLUMNS ON MOBILE!) */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[#5C3637] font-bold">
            CURATED COLLECTIONS
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CURATED_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              href={`/products?category=${col.slug}`}
              className="group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-[#EFE3DA] block bg-[#F5EBE4]"
            >
              <img
                src={col.img}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2526]/80 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-6 text-center text-white">
                <h3 className="font-serif text-lg sm:text-2xl font-normal italic tracking-wide">
                  {col.title}
                </h3>
                <span className="text-[8px] sm:text-[9px] tracking-[0.2em] font-bold uppercase text-stone-200 mt-0.5">
                  {col.sub}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-[#5C3637] hover:text-[#3A2526] transition-colors border-b border-[#5C3637] pb-1"
          >
            <span>EXPLORE ALL COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. BEST SELLERS (2 COLUMNS ON MOBILE!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[#5C3637] font-bold">
            BEST SELLERS
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. OUR STORY SECTION */}
      <section id="our-story" className="bg-[#F5EBE4] border-y border-[#EFE3DA] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 max-w-md mx-auto lg:max-w-none w-full">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#EFE3DA]">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                alt="Jewelry artisan craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 lg:pl-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#3A2526] italic">
                Our Story
              </h2>
              <Heart className="w-4 h-4 text-[#5C3637] fill-[#5C3637]" />
            </div>

            <p className="text-[#8C6B6D] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto sm:mx-0 font-normal">
              S2F Jewels was born from a love for timeless beauty and meaningful connections. Each piece is thoughtfully designed to celebrate your story and the moments that matter most.
            </p>

            <div>
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-[#5C3637] hover:text-[#3A2526] border-b border-[#5C3637] pb-1"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#EFE3DA] text-left">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#5C3637] font-bold text-xs tracking-wider uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ETHICALLY SOURCED</span>
                </div>
                <p className="text-[11px] text-[#8C6B6D]">Responsibly made with care</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#5C3637] font-bold text-xs tracking-wider uppercase">
                  <Award className="w-4 h-4" />
                  <span>PREMIUM QUALITY</span>
                </div>
                <p className="text-[11px] text-[#8C6B6D]">Crafted to last a lifetime</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#5C3637] font-bold text-xs tracking-wider uppercase">
                  <Heart className="w-4 h-4" />
                  <span>MADE WITH LOVE</span>
                </div>
                <p className="text-[11px] text-[#8C6B6D]">Designed in small batches</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. WHAT OUR CUSTOMERS SAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#3A2526]">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="bg-white border border-[#EFE3DA] rounded-2xl p-6 space-y-4 shadow-sm text-center">
            <p className="text-xs text-[#8C6B6D] italic leading-relaxed">
              &quot;The quality is exceptional and the packaging is so beautiful. I felt so special opening my order.&quot;
            </p>
            <div>
              <p className="text-xs font-bold text-[#3A2526]">— Emily R.</p>
              <div className="flex justify-center text-amber-500 space-x-0.5 mt-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EFE3DA] rounded-2xl p-6 space-y-4 shadow-sm text-center">
            <p className="text-xs text-[#8C6B6D] italic leading-relaxed">
              &quot;I wear my necklace every day and get compliments all the time. Absolutely dreamy!&quot;
            </p>
            <div>
              <p className="text-xs font-bold text-[#3A2526]">— Sophia L.</p>
              <div className="flex justify-center text-amber-500 space-x-0.5 mt-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EFE3DA] rounded-2xl p-6 space-y-4 shadow-sm text-center">
            <p className="text-xs text-[#8C6B6D] italic leading-relaxed">
              &quot;The perfect gift! My wife loved it and the customer service was amazing.&quot;
            </p>
            <div>
              <p className="text-xs font-bold text-[#3A2526]">— Daniel K.</p>
              <div className="flex justify-center text-amber-500 space-x-0.5 mt-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STAY CONNECTED NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F5EBE4] border border-[#EFE3DA] rounded-3xl p-6 sm:p-12 text-center space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#3A2526] italic">
            Stay Sparkling
          </h2>
          <p className="text-xs text-[#8C6B6D] max-w-md mx-auto">
            Be the first to know about new arrivals, handcrafted collections & special creations.
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full bg-white border border-[#EFE3DA] rounded-md px-4 py-3 text-xs text-[#3A2526] placeholder-[#8C6B6D] focus:outline-none focus:border-[#5C3637]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#4A2525] hover:bg-[#381B1B] text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-md transition-all shadow-sm shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
