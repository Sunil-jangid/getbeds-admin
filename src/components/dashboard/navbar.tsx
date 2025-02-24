'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const navItems = [
  { name: 'GetBeds', href: '/dashboard' },
  { name: 'Diagnostic Centres', href: '/dashboard/diagnostic' },
  { name: 'Hospital Beds', href: '/hospitals' },
  { name: 'Ambulances', href: '/ambulances' },
  { name: 'Bookings', href: '/bookings' },
  { name: 'Analytics', href: '/analytics' }
]

export function DashboardNavbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-lg border border-[#F8F9FA] px-6 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="GetBeds"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="font-bold text-xl">GetBeds</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 rounded-full">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  pathname === item.href 
                    ? 'bg-black text-white' 
                    : 'text-black hover:bg-gray-100'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="bg-white p-2 rounded-full shadow-sm border border-[#F8F9FA]">
              <Search className="h-5 w-5" />
            </div>

            {/* Notifications */}
            <div className="bg-white p-2 rounded-full shadow-sm border border-[#F8F9FA] relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </div>

            {/* Profile */}
            <div className="bg-white px-3 py-2 rounded-full shadow-sm border border-[#F8F9FA] flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
