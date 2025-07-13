'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { Breadcrumb } from '@/components/dashboard/breadcrumb';
import Footer from '@/components/dashboard/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="text-2xl md:text-6xl font-extrabold text-[#8564E6] drop-shadow-lg"
        >
          GetBeds
        </motion.div>
      </div>
    );
  }

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
        <DashboardNavbar />
        <Breadcrumb />
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
