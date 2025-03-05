"use client";

import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h1 style={{ color: '#0F1531' }} className="text-2xl font-bold text-center mb-8">
      Select a page to Sign in to
      </h1>

      <div className="flex flex-col space-y-4">
        <Link 
          href="https://royacare-agency.onrender.com" 
          className="w-full p-6 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg text-center text-xl font-semibold"
        >
          Recruitment & Compliance
        </Link>

        <Link 
          href="https://bookingandpayroll.onrender.com" 
          className="w-full p-6 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg text-center text-xl font-semibold"
        >
          Booking & Payroll
        </Link>

        <Link 
          href="https://royacare-admin.onrender.com" 
          className="w-full p-6 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg text-center text-xl font-semibold"
        >
          Admin System
        </Link>
      </div>
    </section>
  );
}