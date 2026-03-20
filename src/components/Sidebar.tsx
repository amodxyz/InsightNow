'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import AdBanner from './Ads';

export default function Sidebar() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const popularTags = ['AI', 'Stock Market', 'Championship', 'Movies', 'Health', 'Space', 'Startups', 'Innovation'];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="space-y-4 sm:space-y-6">
      <div className="p-4 sm:p-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl sm:rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">Newsletter</h3>
            <p className="text-primary-100 text-xs sm:text-sm">Daily headlines</p>
          </div>
        </div>
        <form className="space-y-2 sm:space-y-3" onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white text-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {subscribed && (
          <p className="text-center text-sm mt-2 text-primary-100">Thanks for subscribing!</p>
        )}
      </div>

      <AdBanner size="medium-rectangle" className="mx-auto hidden md:block" />

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 sm:h-6 bg-primary-500 rounded-full"></span>
          Categories
        </h3>
        <ul className="space-y-1 sm:space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}/`}
                className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-primary-50 transition-all group"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <span className="text-base sm:text-xl">{cat.icon}</span>
                  <span className="font-medium text-gray-700 group-hover:text-primary-600 text-sm sm:text-base">{cat.name}</span>
                </span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AdBanner size="medium-rectangle" className="mx-auto hidden lg:block" />

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 sm:h-6 bg-accent-500 rounded-full"></span>
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/search/?q=${encodeURIComponent(tag)}`}
              className="px-2.5 sm:px-4 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium hover:bg-primary-100 hover:text-primary-700 transition-all"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <AdBanner size="medium-rectangle" className="mx-auto hidden md:block" />

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">📧</span>
          </div>
          <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">Stay Updated</h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">Get breaking news in your inbox.</p>
          <form className="space-y-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white/40"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribed && (
            <p className="text-center text-sm mt-2 text-accent-300">Thanks for subscribing!</p>
          )}
        </div>
      </div>

      <AdBanner size="medium-rectangle" className="mx-auto hidden md:block" />
    </aside>
  );
}
