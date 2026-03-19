'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNav = [
  { name: 'Dashboard', href: '/admin/' },
  { name: 'Articles', href: '/admin/articles/' },
  { name: 'Ads', href: '/admin/ads/' },
  { name: 'Media', href: '/admin/media/' },
  { name: 'Analytics', href: '/admin/analytics/' },
  { name: 'Users', href: '/admin/users/' },
  { name: 'Categories', href: '/admin/categories/' },
  { name: 'Settings', href: '/admin/settings/' },
];

export default function AdminMobileMenu() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <Link href="/admin/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">I</span>
          </div>
          <span className="font-bold">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex overflow-x-auto px-4 py-2 gap-2">
        {adminNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
