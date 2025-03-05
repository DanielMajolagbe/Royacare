"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0F1531]"></div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h1 style={{ color: '#0F1531' }} className="text-2xl font-bold text-center mb-8">
        Select a page to Sign in to
      </h1>

      <div className="flex flex-col space-y-4">
        <Link 
          href="https://royacare-compliance.onrender.com" 
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
          Manager & Director
        </Link>
      </div>
    </section>
  );
}