import { Ad } from './db';

export type { Ad };

export const ads: Ad[] = [
  {
    id: '1',
    title: 'Tech Sale Banner',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=728&h=90&fit=crop',
    linkUrl: 'https://example.com/tech-sale',
    position: 'homepage-top',
    size: 'leaderboard',
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    clicks: 150,
    impressions: 5000,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Sidebar Ad',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=250&fit=crop',
    linkUrl: 'https://example.com/product',
    position: 'sidebar',
    size: 'medium-rectangle',
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    clicks: 80,
    impressions: 3000,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Business Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=728&h=90&fit=crop',
    linkUrl: 'https://example.com/business',
    position: 'article-top',
    size: 'leaderboard',
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    clicks: 200,
    impressions: 8000,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '4',
    title: 'Homepage Middle Banner',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=250&fit=crop',
    linkUrl: 'https://example.com/promo',
    position: 'homepage-middle',
    size: 'medium-rectangle',
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    clicks: 120,
    impressions: 4500,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

export function getActiveAds(position?: string): Ad[] {
  const now = new Date().toISOString().split('T')[0];
  
  return ads.filter(ad => {
    if (ad.status !== 'active') return false;
    if (position && ad.position !== position) return false;
    if (ad.startDate && ad.startDate > now) return false;
    if (ad.endDate && ad.endDate < now) return false;
    return true;
  });
}

export const adPositions = [
  'homepage-top',
  'homepage-middle',
  'article-top',
  'article-middle',
  'article-bottom',
  'sidebar',
  'category-top',
];

export function getAdSizes(): { value: string; label: string; dimensions: string }[] {
  return [
    { value: 'leaderboard', label: 'Leaderboard', dimensions: '728x90' },
    { value: 'medium-rectangle', label: 'Medium Rectangle', dimensions: '300x250' },
    { value: 'large-rectangle', label: 'Large Rectangle', dimensions: '336x280' },
    { value: 'wide-skyscraper', label: 'Wide Skyscraper', dimensions: '160x600' },
  ];
}
