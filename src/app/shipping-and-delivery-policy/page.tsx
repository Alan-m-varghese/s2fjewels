import React from 'react';
import Link from 'next/link';
import { Truck, PackageCheck, MapPin, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Policy | S2F Jewels',
  description: 'Shipping charges, dispatch timelines, and delivery terms for S2F Jewels.',
};

export default function ShippingAndDeliveryPolicyPage() {
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
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#8C6B6D] mt-2 leading-relaxed">
              Last updated: September 28, 2026 • Detailed information on dispatch times, delivery charges, and tracking.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-[#EFE3DA] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm text-xs sm:text-sm leading-relaxed text-[#5C3637]">
          
          {/* Section 1: Shipping Charges */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Truck className="w-5 h-5 text-[#5C3637]" />
              <h2>1. Shipping Rates & Delivery Coverage</h2>
            </div>
            <p className="text-[#8C6B6D]">
              S2F Jewels delivers fine jewelry pieces to pin codes across India using trusted, insured express courier partners.
            </p>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl text-xs space-y-1">
              <p className="font-bold text-[#3A2526]">Standard Delivery Charge:</p>
              <p className="text-[#8C6B6D]">A flat shipping fee of <strong>₹100</strong> applies to all orders across India, calculated automatically at checkout.</p>
            </div>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 2: Order Dispatch & Timelines */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Clock className="w-5 h-5 text-[#5C3637]" />
              <h2>2. Order Dispatch & Estimated Delivery Timelines</h2>
            </div>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-2 pl-2">
              <li><strong>Dispatch Time:</strong> Orders are processed, quality inspected, and packed for dispatch within <strong>1 to 3 business days</strong> after order confirmation.</li>
              <li><strong>Delivery Time:</strong> Standard delivery usually takes between <strong>3 to 7 business days</strong> from the date of dispatch, depending on the destination region (Metro cities: 2–4 days, Tier 2/3 cities & remote regions: 4–7 days).</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 3: Package Tracking */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <PackageCheck className="w-5 h-5 text-[#5C3637]" />
              <h2>3. Package Tracking & Order Updates</h2>
            </div>
            <p className="text-[#8C6B6D]">
              Once your order is dispatched from our workshop, you will receive an automated notification containing your courier tracking ID and carrier website link. You can track your package in real-time via the tracking link provided or under your account order history.
            </p>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 4: Safe Delivery & Transit Insurance */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <ShieldCheck className="w-5 h-5 text-[#5C3637]" />
              <h2>4. Tamper-Evident Packaging & Delivery</h2>
            </div>
            <p className="text-[#8C6B6D]">
              All S2F Jewels creations are packed in tamper-evident sealed packaging for your security. Please inspect the outer packaging upon receipt. If the outer seal is visibly damaged, tampered with, or open, <strong>do not accept the package</strong> from the delivery executive and contact us immediately.
            </p>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 5: Shipping Inquiries */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <MapPin className="w-5 h-5 text-[#5C3637]" />
              <h2>5. Shipping Support & Contact</h2>
            </div>
            <p className="text-[#8C6B6D]">
              For any questions regarding shipping status, delivery delays, or address updates:
            </p>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl text-xs space-y-1">
              <p className="font-bold text-[#3A2526]">S2F Jewels Shipping Desk</p>
              <p className="text-[#8C6B6D]">Email: support@s2fjewels.com</p>
              <p className="text-[#8C6B6D]">WhatsApp / Phone: +91 90378 12684</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
