// app/under-construction/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const UnderConstruction = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Work In Progress</h1>
      <p className="text-gray-600 mb-6 text-lg">
        This feature or page is currently under construction. We’ll fix it soon!
      </p>
      <Link href="/dashboard">
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default UnderConstruction;
