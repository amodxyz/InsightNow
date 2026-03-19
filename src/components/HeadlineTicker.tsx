'use client';

import Link from 'next/link';
import { useState } from 'react';
import { articles } from '@/lib/data';

export default function HeadlineTicker() {
  const [isPaused, setIsPaused] = useState(false);

  const tickerItems = articles.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
  }));

  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-scroll {
          animation: ticker 30s linear infinite;
        }
        .ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="flex items-stretch">
          <div className="flex-shrink-0 bg-primary-600 px-3 md:px-4 py-2 md:py-2.5 z-20 flex items-center shadow-lg">
            <span className="font-bold text-xs md:text-sm uppercase tracking-wide flex items-center gap-1 md:gap-2">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
              </span>
              <span className="hidden xs:inline">Breaking</span>
              <span className="xs:hidden">LIVE</span>
            </span>
          </div>
          
          <div className="relative flex-1 overflow-hidden">
            <div className="flex ticker-scroll">
              {duplicatedItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={`/article/${item.slug}/`}
                  className="flex items-center px-4 md:px-6 py-2 md:py-2.5 hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <span className="text-[10px] md:text-xs font-medium px-1.5 md:px-2 py-0.5 bg-primary-500/30 rounded mr-2 md:mr-3 hidden sm:inline">
                    {item.category}
                  </span>
                  <span className="text-xs md:text-sm">{item.title}</span>
                  <span className="mx-4 md:mx-8 text-primary-400">•</span>
                </Link>
              ))}
            </div>
            
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </>
  );
}
