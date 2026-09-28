'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, ArrowLeft, MessageSquare } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="bg-[#FAF4F0] min-h-screen py-12 sm:py-16 text-[#3A2526]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
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
              Contact Us
            </h1>
            <p className="text-xs sm:text-sm text-[#8C6B6D] mt-2 leading-relaxed">
              We are here to assist you with order queries, bespoke assistance, or policy guidance.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Contact Information Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#EFE3DA] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl text-[#3A2526]">Get In Touch</h2>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#5C3637]">
                
                {/* Brand Details */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#5C3637] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3A2526]">Business Entity</h3>
                    <p className="text-[#8C6B6D] mt-0.5">S2F Jewels</p>
                    <p className="text-[#8C6B6D]">Kerala, India</p>
                  </div>
                </div>

                <hr className="border-[#EFE3DA]" />

                {/* Phone & WhatsApp */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#5C3637] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3A2526]">Phone & WhatsApp</h3>
                    <p className="text-[#8C6B6D] mt-0.5">+91 90378 12684</p>
                    <p className="text-[11px] text-[#8C6B6D]">Mon – Sat: 9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>

                <hr className="border-[#EFE3DA]" />

                {/* Email Support */}
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#5C3637] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3A2526]">Email Support</h3>
                    <p className="text-[#8C6B6D] mt-0.5">support@s2fjewels.com</p>
                    <p className="text-[11px] text-[#8C6B6D]">Responses within 24 hours</p>
                  </div>
                </div>

                <hr className="border-[#EFE3DA]" />

                {/* Support Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#5C3637] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3A2526]">Operating Hours</h3>
                    <p className="text-[#8C6B6D] mt-0.5">Monday to Saturday</p>
                    <p className="text-[11px] text-[#8C6B6D]">9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Column 2 & 3: Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#EFE3DA] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="font-serif text-xl text-[#3A2526] flex items-center">
                  <MessageSquare className="w-5 h-5 text-[#5C3637] mr-2" />
                  Send Us a Message
                </h2>
                <p className="text-xs text-[#8C6B6D] mt-1">
                  Have a question about a product or order? Fill in the details below and we will get back to you.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A2526] mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EFE3DA] bg-[#FAF4F0]/40 text-xs focus:outline-none focus:ring-1 focus:ring-[#5C3637]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3A2526] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 Mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EFE3DA] bg-[#FAF4F0]/40 text-xs focus:outline-none focus:ring-1 focus:ring-[#5C3637]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A2526] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE3DA] bg-[#FAF4F0]/40 text-xs focus:outline-none focus:ring-1 focus:ring-[#5C3637]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A2526] mb-1">Message / Inquiry</label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE3DA] bg-[#FAF4F0]/40 text-xs focus:outline-none focus:ring-1 focus:ring-[#5C3637]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#3A2526] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#5C3637] transition-colors inline-flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Submit Message
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
