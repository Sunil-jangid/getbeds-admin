'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Bookings', href: '/dashboard/bookings' },
  {
    name: 'Inventory',
    href: '/dashboard/inventory',
    dropdownItems: [
      { name: 'Manage Hospitals', href: '/dashboard/inventory/hospitals' },
      { name: 'Manage Ambulance', href: '/dashboard/inventory/ambulance' },
      { name: 'Manage Diagnostic Centres', href: '/dashboard/inventory/diagnostic' },
      { name: 'Manage Users', href: '/dashboard/inventory/users' },
    ]
  },
  {
    name: 'Payment',
    href: '/dashboard/payment',
    dropdownItems: [
      { name: 'Payment Analytics', href: '/dashboard/Payment/Payment' },
      { name: 'Admin Payment Details', href: '/dashboard/Payment/add' },
    ]
  },
  { name: 'Analytics', href: '/dashboard/analytics' },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'User Management', href: '/dashboard/usermanagement' },
    { name: 'Customer Support', href: '/dashboard/customersupport' },
    { name: 'Subscription Plan', href: '/dashboard/subscription' },
    { name: 'Settings', href: '/dashboard/Settings' },
    { name: 'Log out', href: '/' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }

      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-lg border border-[#F8F9FA] px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
  <Link href="/dashboard" className="flex items-center gap-2">
    <span className="text-6xl font-bold text-sky-500">G</span>
    <span className="font-bold text-xl">GetBeds</span>
  </Link>
</div>


          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 rounded-full" ref={navRef}>
            {navItems.map((item) => {
              const isDropdownOpen = openDropdown === item.name;
              const isActive =
                pathname === item.href ||
                item.dropdownItems?.some((sub) => pathname === sub.href);

              if (item.dropdownItems) {
                return (
                  <div key={item.href} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(isDropdownOpen ? null : item.name)
                      }
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1',
                        isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden">
                        {item.dropdownItems.map((dropdownItem, index) => {
                          const isSubActive = pathname === dropdownItem.href;
                          return (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                'block px-4 py-2 text-sm transition-all w-full',
                                index === 0 ? 'rounded-t-2xl' : '',
                                index === item.dropdownItems.length - 1 ? 'rounded-b-2xl' : '',
                                isSubActive
                                  ? 'bg-black text-white'
                                  : 'hover:bg-black hover:text-white text-black'
                              )}
                            >
                              {dropdownItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
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
              );
            })}
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="bg-white p-2 rounded-full shadow-sm border border-[#F8F9FA]">
              <Search className="h-5 w-5" />
            </div>

            {/* Notification */}
            <Link href="/dashboard/notification">
              <div className="bg-white p-2 rounded-full shadow-sm border border-[#F8F9FA] relative cursor-pointer hover:shadow-md transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </div>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="bg-white px-3 py-2 rounded-full shadow-sm border border-[#F8F9FA] flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-col text-right">
                  <span className="text-sm font-medium text-black">John Doe</span>
                  <span className="text-xs text-muted-foreground text-gray-500">Admin</span>
                </div>
                <img
                  src="/pro.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsProfileOpen(false)}
                      className={`block px-4 py-2 text-sm transition-all duration-300 hover:bg-black hover:text-white ${
                        index === 0 ? 'font-medium rounded-t-2xl' : ''
                      } ${index === menuItems.length - 1 ? 'rounded-b-2xl' : ''}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
