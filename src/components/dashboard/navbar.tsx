'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Bookings', href: '/dashboard/bookings' },
  {
    name: 'Inventory',
    href: '/dashboard/inventory/hospitals',
    dropdownItems: [
      { name: 'Manage Hospitals', href: '/dashboard/inventory/hospitals' },
      { name: 'Manage Ambulance', href: '/under-construction' },
      { name: 'Manage Diagnostic Centres', href: '/under-construction' },
      { name: 'Manage Users', href: '/dashboard/inventory/users' },
    ]
  },
  {
    name: 'Payment',
    href: '/dashboard/Payment/Payment',
    dropdownItems: [
      { name: 'Payment Analytics', href: '/dashboard/Payment/Payment' },
      { name: 'Admin Payment Details', href: '/dashboard/Payment/adminpayment' },
    ]
  },
  { name: 'Analytics', href: '/dashboard/analytics' },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState<{ name: string; href: string }[]>([]);
  const [selectedHref, setSelectedHref] = useState('');

  const profileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'User Management', href: '/dashboard/usermanagement' },
    { name: 'Customer Support', href: '/dashboard/customersupport' },
    { name: 'Subscription Plan', href: '/dashboard/subscription' },
    { name: 'Settings', href: '/dashboard/Settings' },
    { name: 'Log out', href: '/' },
  ];

  const allPages = navItems.flatMap((item) =>
    item.dropdownItems
      ? [
          { name: item.name, href: item.href },
          ...item.dropdownItems,
        ]
      : [{ name: item.name, href: item.href }]
  );

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

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setFilteredPages([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchToggle = () => {
    setShowSearchBar((prev) => !prev);
    setSearchQuery('');
    setFilteredPages([]);
    setSelectedHref('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const matched = allPages.filter((page) =>
      page.name.toLowerCase().includes(query)
    );
    setFilteredPages(matched);
    setSelectedHref('');
  };

  const handleSuggestionClick = (item: { name: string; href: string }) => {
    setSearchQuery(item.name);
    setFilteredPages([]);
    setSelectedHref(item.href);
  };

  const handleSearchSubmit = () => {
    const finalHref =
      selectedHref || allPages.find((page) => page.name.toLowerCase() === searchQuery.toLowerCase())?.href;

    if (finalHref) {
      router.push(finalHref);
      setShowSearchBar(false);
      setSearchQuery('');
      setSelectedHref('');
    } else {
      alert('No matching page found');
    }
  };

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

          {/* Navigation or Search */}
          <div
            className="relative flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 rounded-full"
            ref={navRef}
          >
            {showSearchBar ? (
              <div className="relative flex flex-col px-4 py-2" ref={searchRef}>
                <div className="flex gap-2 items-center w-full max-w-3xl">
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-96 px-4 py-2 text-sm border rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Search
                  </button>
                </div>

                {filteredPages.length > 0 && (
                  <div className="absolute top-[100%] mt-1 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto">
                    {filteredPages.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleSuggestionClick(item)}
                        className="text-left w-full px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              navItems.map((item) => {
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
              })
            )}
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <div
              onClick={handleSearchToggle}
              className="bg-white p-2 rounded-full shadow-sm border border-[#F8F9FA] relative cursor-pointer hover:shadow-md transition"
            >
              <Search className="h-5 w-5" />
            </div>

            {/* Notification */}
            <Link href="/dashboard/notification">
              <div className="bg-white p-2 rounded-full shadow-sm border border-[#F8F9FA] relative cursor-pointer hover:shadow-md transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </div>
            </Link>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="bg-white px-3 py-2 rounded-full shadow-sm border border-[#F8F9FA] flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-col text-right">
                  <span className="text-sm font-medium text-black">John Doe</span>
                  <span className="text-xs text-muted-foreground text-gray-500">Admin</span>
                </div>
                <Image
                  src="/pro.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
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
