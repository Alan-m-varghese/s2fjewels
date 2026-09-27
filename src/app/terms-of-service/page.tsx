import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, Truck, RefreshCw, Scale, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | S2F Jewels',
  description: 'Terms and conditions governing purchases and usage of S2F Jewels fine jewelry storefront.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FAF4F0] min-h-screen py-12 sm:py-16 text-[#3A2526]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#5C3637] hover:text-[#3A2526] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>
          <div className="border-b border-[#EFE3DA] pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#3A2526] italic">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-[#8C6B6D] mt-2 leading-relaxed">
              Last updated: September 27, 2026 • Please read these terms carefully before making purchases on S2F Jewels.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-[#EFE3DA] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm text-xs sm:text-sm leading-relaxed text-[#5C3637]">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Scale className="w-5 h-5 text-[#5C3637]" />
              <h2>1. Acceptance of Terms</h2>
            </div>
            <p className="text-[#8C6B6D]">
              By accessing, browsing, or placing an order on S2F Jewels (s2fjewels.com), you acknowledge and agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <FileText className="w-5 h-5 text-[#5C3637]" />
              <h2>2. Handcrafted Craftsmanship & Product Imagery</h2>
            </div>
            <p className="text-[#8C6B6D]">
              Each creation at S2F Jewels is meticulously handcrafted in small batches. Due to the handcrafted nature of traditional Kundan, gemstone, and fine metal jewelry, subtle variations in color, texture, or stone settings may occur and celebrate authentic craftsmanship.
            </p>
            <p className="text-[#8C6B6D]">
              We take utmost care to ensure product images accurately display color and details. However, actual colors may slightly vary depending on screen display settings.
            </p>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Truck className="w-5 h-5 text-[#5C3637]" />
              <h2>3. Pricing, Delivery Charge & Payment</h2>
            </div>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-1.5 pl-2">
              <li>All prices listed on the storefront are in Indian Rupees (INR) and inclusive of all applicable GST taxes.</li>
              <li>A flat delivery charge of <strong>₹100</strong> is applied to each order at checkout across India.</li>
              <li>Payments are processed securely via Razorpay (UPI, Credit/Debit Cards, NetBanking). Orders are confirmed upon successful payment verification.</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <RefreshCw className="w-5 h-5 text-[#5C3637]" />
              <h2>4. Strict No Returns Policy</h2>
            </div>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl space-y-2">
              <p className="font-bold text-[#3A2526]">Strict Policy Notice:</p>
              <p className="text-[#8C6B6D]">
                S2F Jewels enforces a strict <strong>NO RETURNS & NO EXCHANGES</strong> policy on all sold jewelry items due to hygiene and bespoke handcrafted standards.
              </p>
              <p className="text-[#8C6B6D]">
                In the rare event of transit damage or wrong item received, replacement requests are entertained strictly if accompanied by a <strong>mandatory continuous unboxing video</strong> recorded right from opening the sealed outer package, reported within 24 hours of delivery.
              </p>
            </div>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <ShieldAlert className="w-5 h-5 text-[#5C3637]" />
              <h2>5. Contact & Customer Care</h2>
            </div>
            <p className="text-[#8C6B6D]">
              For any questions regarding orders, policies, or product care guidelines, please contact our team:
            </p>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl text-xs space-y-1">
              <p className="font-bold text-[#3A2526]">S2F Jewels Customer Service</p>
              <p className="text-[#8C6B6D]">Email: support@s2fjewels.com</p>
              <p className="text-[#8C6B6D]">Helpline / WhatsApp: +91 90378 12684</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
