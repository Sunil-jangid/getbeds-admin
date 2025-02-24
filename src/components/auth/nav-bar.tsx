'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'GetBeds', href: '/' },
  { name: 'Diagnostic Centres', href: '/diagnostic' },
  { name: 'Hospital Beds', href: '/hospitals' },
  { name: 'Ambulances', href: '/ambulances' },
  { name: 'Bookings', href: '/bookings' },
  { name: 'Real Time Analytics', href: '/analytics' }
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-card">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 md:gap-10 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary whitespace-nowrap',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
