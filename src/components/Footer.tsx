'use client';

import Link from 'next/link';
import { categories } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-8 sm:py-12 border-b border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-xl">I</span>
                </div>
                <span className="text-xl sm:text-2xl font-extrabold">InsightNow</span>
              </Link>
              <p className="text-gray-400 leading-relaxed text-sm">
                Your trusted source for breaking news and comprehensive coverage.
              </p>
              <div className="flex gap-2 sm:gap-3 mt-4">
                {['twitter', 'facebook', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social}
                  >
                    <span className="text-xs sm:text-sm capitalize">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-1 h-5 sm:h-6 bg-primary-500 rounded-full"></span>
                Categories
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}/`}
                      className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-1 h-5 sm:h-6 bg-accent-500 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
                <li><Link href="/search/" className="text-gray-400 hover:text-white transition-colors text-sm">Search</Link></li>
                <li><Link href="/privacy-policy/" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service/" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="/cookie-policy/" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-1 h-5 sm:h-6 bg-accent-500 rounded-full"></span>
                Newsletter
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm">Get breaking news delivered to your inbox daily.</p>
              <form className="space-y-2 sm:space-y-3" action="#" method="POST">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg sm:rounded-xl border border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all placeholder-gray-500 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            &copy; {currentYear} InsightNow. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <Link href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy/" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
