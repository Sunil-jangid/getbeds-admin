'use client';

import { DashboardNavbar } from '@/components/dashboard/navbar';
import { Breadcrumb } from '@/components/dashboard/breadcrumb';
import Footer from '@/components/dashboard/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      {/* Mobile/Tablet Fallback Message */}
      <div className="block lg:hidden w-full h-screen flex items-center justify-center text-center px-6 bg-white">
        <div>
          <h1 className="text-2xl font-semibold">This website works only on Desktop.</h1>
          <p className="mt-4 text-gray-600">
            Please use a desktop device or increase your browser width.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex flex-col w-full min-h-screen bg-background">
        {/* Sticky Navbar */}
        <DashboardNavbar />

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Main content area */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
