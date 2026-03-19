'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ads, getActiveAds } from '@/lib/ads';

interface AdBannerProps {
  size?: 'leaderboard' | 'medium-rectangle' | 'large-rectangle' | 'wide-skyscraper';
  className?: string;
  position?: string;
}

export default function AdBanner({ size = 'leaderboard', className = '', position }: AdBannerProps) {
  const activeAds = position ? getActiveAds(position) : [];
  const activeAd = activeAds[0];

  const dimensions = {
    'leaderboard': 'h-[60px] md:h-[90px] w-full max-w-[320px] md:max-w-[728px]',
    'medium-rectangle': 'h-[200px] sm:h-[250px] w-full max-w-[280px] sm:max-w-[300px]',
    'large-rectangle': 'h-[240px] sm:h-[280px] w-full max-w-[300px] sm:max-w-[336px]',
    'wide-skyscraper': 'h-[400px] sm:h-[500px] md:h-[600px] w-[120px] sm:w-[160px]',
  };

  if (activeAd) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <a
          href={activeAd.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-lg transition-all hover:shadow-lg"
        >
          <Image
            src={activeAd.imageUrl}
            alt={activeAd.title}
            width={size === 'leaderboard' ? 728 : size === 'medium-rectangle' ? 300 : size === 'large-rectangle' ? 336 : 160}
            height={size === 'leaderboard' ? 90 : size === 'medium-rectangle' ? 250 : size === 'large-rectangle' ? 280 : 600}
            className="object-cover rounded-lg"
          />
          <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/50 text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Ad
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${dimensions[size]} bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-gray-400 p-4`}>
        <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mb-1 sm:mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-center">Advertisement</span>
      </div>
    </div>
  );
}

export function AdInArticle({ position }: { position: 'top' | 'middle' | 'bottom' }) {
  return (
    <div className="my-4 sm:my-6 md:my-8">
      <AdBanner size="medium-rectangle" className="mx-auto" position={`article-${position}`} />
    </div>
  );
}

export function AdInSidebar() {
  const activeSidebarAds = getActiveAds('sidebar');
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {activeSidebarAds.slice(0, 1).map((ad) => (
        <a
          key={ad.id}
          href={ad.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group relative overflow-hidden rounded-xl hover:shadow-lg transition-all"
        >
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            width={300}
            height={250}
            className="object-cover rounded-xl"
          />
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Ad
          </div>
        </a>
      ))}
      {activeSidebarAds.length === 0 && (
        <>
          <AdBanner size="medium-rectangle" />
          <div className="hidden md:flex justify-center">
            <AdBanner size="wide-skyscraper" />
          </div>
        </>
      )}
    </div>
  );
}

export function AdBetweenSections() {
  return (
    <div className="py-4 sm:py-6 md:py-8">
      <AdBanner size="leaderboard" className="mx-auto" position="homepage-top" />
    </div>
  );
}

export function AdInHomepage() {
  const homepageAds = getActiveAds('homepage-middle');
  
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6 md:my-8">
        {homepageAds.slice(0, 2).map((ad) => (
          <a
            key={ad.id}
            href={ad.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl hover:shadow-lg transition-all mx-auto"
          >
            <Image
              src={ad.imageUrl}
              alt={ad.title}
              width={300}
              height={250}
              className="object-cover rounded-xl"
            />
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Ad
            </div>
          </a>
        ))}
        {homepageAds.length < 2 && (
          <>
            <AdBanner size="medium-rectangle" className="hidden sm:block" />
          </>
        )}
      </div>
    </div>
  );
}
