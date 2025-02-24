'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <div className="flex items-center gap-2 px-6 py-2 text-sm text-muted-foreground bg-white border-b">
      <Link href="/dashboard" className="hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1
        
        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link
              href={path}
              className={`capitalize ${isLast ? 'text-foreground font-medium' : 'hover:text-foreground'}`}
            >
              {segment}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
