import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Heart } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | S2F Jewels',
  description: 'Learn how S2F Jewels protects, uses, and safeguards your personal information.',
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#8C6B6D] mt-2 leading-relaxed">
              Last updated: September 27, 2026 • Your trust and privacy are paramount to us at S2F Jewels.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-[#EFE3DA] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm text-xs sm:text-sm leading-relaxed text-[#5C3637]">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <ShieldCheck className="w-5 h-5 text-[#5C3637]" />
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-[#8C6B6D]">
              When you visit our website, register an account, or make a purchase, we collect necessary personal information to process your order smoothly. This includes:
            </p>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-1.5 pl-2">
              <li>Contact details such as your full name, email address, and mobile phone number for order updates.</li>
              <li>Complete shipping and billing address for insured door delivery.</li>
              <li>Account credentials (encrypted password hashes) when you create an account with us.</li>
              <li>Transaction reference IDs and order history details.</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Lock className="w-5 h-5 text-[#5C3637]" />
              <h2>2. How We Use Your Information</h2>
            </div>
            <p className="text-[#8C6B6D]">
              Your information is exclusively utilized for providing an exceptional shopping experience and fulfilling your orders:
            </p>
            <ul className="list-disc list-inside text-[#8C6B6D] space-y-1.5 pl-2">
              <li>Processing, verifying, and shipping your fine jewelry orders.</li>
              <li>Sending automated order confirmations, delivery updates, and tracking numbers via SMS or WhatsApp.</li>
              <li>Providing attentive customer support regarding queries or order updates.</li>
              <li>Improving website security, preventing fraud, and ensuring smooth checkout operations.</li>
            </ul>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Eye className="w-5 h-5 text-[#5C3637]" />
              <h2>3. Payment Security & Third-Party Sharing</h2>
            </div>
            <p className="text-[#8C6B6D]">
              S2F Jewels strictly values your confidentiality. We do <strong>NOT</strong> sell, rent, or trade your personal information to third-party advertisers.
            </p>
            <p className="text-[#8C6B6D]">
              All online payments are securely processed through industry-certified payment gateways (such as Razorpay). S2F Jewels never stores your full credit/debit card numbers, CVVs, or net banking passwords on our servers.
            </p>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <FileText className="w-5 h-5 text-[#5C3637]" />
              <h2>4. Cookies & Session Storage</h2>
            </div>
            <p className="text-[#8C6B6D]">
              Our website uses essential cookies and local storage to keep track of items in your shopping cart, maintain your logged-in session, and remember your shopping preferences across pages. You can control cookie preferences in your browser settings.
            </p>
          </section>

          <hr className="border-[#EFE3DA]" />

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3A2526] font-bold text-base font-serif">
              <Heart className="w-5 h-5 text-[#5C3637]" />
              <h2>5. Contact Us Regarding Privacy</h2>
            </div>
            <p className="text-[#8C6B6D]">
              If you have any questions, concerns, or requests regarding your personal data or privacy rights, please reach out to our team at:
            </p>
            <div className="p-4 bg-[#FAF4F0] border border-[#EFE3DA] rounded-2xl text-xs space-y-1">
              <p className="font-bold text-[#3A2526]">S2F Jewels Privacy Support Team</p>
              <p className="text-[#8C6B6D]">Email: support@s2fjewels.com</p>
              <p className="text-[#8C6B6D]">WhatsApp / Phone: +91 90378 12684</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
