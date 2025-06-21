'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-2 border-b bg-white text-sm text-muted-foreground">
      <div className="w-full flex flex-wrap items-center gap-2">
        {/* Home Link */}
        <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-4 w-4" />
        </Link>

        {/* Dynamic Segments */}
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;

          return (
            <div key={path} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link
                href={path}
                className={`capitalize ${
                  isLast ? 'text-foreground font-medium' : 'hover:text-foreground'
                }`}
              >
                {segment.replace(/-/g, ' ')}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
