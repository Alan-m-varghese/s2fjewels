import React from 'react';
import Link from 'next/link';
import { RefreshCw, Video, AlertCircle, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cancellation & Refund Policy | S2F Jewels',
  description: 'Detailed cancellation, return, and refund policies for S2F Jewels fine jewelry products.',
};

export default function CancellationAndRefundPolicyPage() {
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
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#8C6B6D] mt-2 leading-relaxed">
              Last updated: September 28, 2026 • Please read our order cancellation and return guidelines.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-[#EFE3DA] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm text-xs sm:text-sm leading-relaxed text-[#5C3637]">
          
          {/* Section 1: Order Cancellation */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Clock className="w-5 h-5 text-[#5C3637]" />
              <h2>1. Order Cancellation Policy</h2>
            </div>
            <p className="text-[#8C6B6D]">
              We understand that plans can change. Orders placed on S2F Jewels can be canceled under the following terms:
            </p>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-1.5 pl-2">
              <li><strong>Prior to Dispatch:</strong> You may request cancellation within 12 hours of placing the order or before the item has been packed and dispatched. Upon successful cancellation, a 100% full refund will be initiated to your original payment method.</li>
              <li><strong>Post Dispatch:</strong> Once an order has been handed over to our courier partner and a tracking number has been generated, cancellations cannot be processed.</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 2: Returns & Exchanges */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <RefreshCw className="w-5 h-5 text-[#5C3637]" />
              <h2>2. Return & Exchange Policy</h2>
            </div>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl space-y-2">
              <p className="font-bold text-[#3A2526] flex items-center">
                <AlertCircle className="w-4 h-4 text-[#5C3637] mr-2 shrink-0" />
                Strict No-Return Standard for Fine Jewelry:
              </p>
              <p className="text-[#8C6B6D]">
                Due to hygiene standards and the bespoke handcrafted nature of our jewelry creations, S2F Jewels maintains a strict <strong>NO RETURN & NO EXCHANGE</strong> policy for non-damaged items.
              </p>
            </div>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 3: Damaged or Incorrect Items */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Video className="w-5 h-5 text-[#5C3637]" />
              <h2>3. Damaged or Wrong Item Claims (Unboxing Video Mandatory)</h2>
            </div>
            <p className="text-[#8C6B6D]">
              We perform rigorous quality control checks prior to dispatching each piece. However, if your package arrives damaged during transit or if an incorrect item was delivered:
            </p>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-1.5 pl-2">
              <li>A <strong>continuous, unedited unboxing video</strong> is mandatory. The video must start before opening the outer courier parcel bag and clearly show the shipping label and the product condition.</li>
              <li>Claims must be reported to our support team within <strong>24 hours of delivery</strong> along with your order ID and the unboxing video.</li>
              <li>Once verified and approved by our quality team, we will send an immediate free replacement or issue a full refund if the item is out of stock.</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 4: Refund Processing Timeline */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <CheckCircle2 className="w-5 h-5 text-[#5C3637]" />
              <h2>4. Refund Processing & Timelines</h2>
            </div>
            <p className="text-[#8C6B6D]">
              When a refund is approved by S2F Jewels:
            </p>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-1.5 pl-2">
              <li>Refunds will be processed to the original payment mode (UPI, Credit/Debit Card, Net Banking) used during purchase via Razorpay.</li>
              <li>The refunded amount typically reflects in your bank account or card statement within <strong>5 to 7 business days</strong>.</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 5: Contact Support */}
          <section className="space-y-3">
            <h2 className="font-bold text-[#3A2526] text-base font-serif">5. How to Initiate a Return / Refund Claim</h2>
            <p className="text-[#8C6B6D]">
              To submit an unboxing video or report an order issue, please reach out to customer care:
            </p>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl text-xs space-y-1">
              <p className="font-bold text-[#3A2526]">S2F Jewels Customer Care</p>
              <p className="text-[#8C6B6D]">Email: support@s2fjewels.com</p>
              <p className="text-[#8C6B6D]">WhatsApp / Phone: +91 90378 12684</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
