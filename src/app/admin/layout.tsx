'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileMenu from '@/components/admin/AdminMobileMenu';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';
    
    if (isLoginPage) {
      setIsChecking(false);
      return;
    }

    const savedUser = localStorage.getItem('insightnow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        window.location.href = '/admin/login/';
      }
    } else {
      window.location.href = '/admin/login/';
    }
    setIsChecking(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('insightnow_user');
    window.location.href = '/admin/login/';
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-auto">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <span className="font-bold text-gray-900 hidden sm:block">InsightNow Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'A'}
                  </div>
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
              )}
              <Link href="/" className="text-sm text-gray-600 hover:text-primary-600 px-3 py-2">View Site</Link>
              <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-600 px-3 py-2">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <AdminMobileMenu />

      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
