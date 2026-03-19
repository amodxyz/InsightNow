'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createAd } from '@/lib/storage';

const positions = [
  { value: 'homepage-top', label: 'Homepage - Top', size: 'leaderboard' },
  { value: 'homepage-middle', label: 'Homepage - Middle', size: 'leaderboard' },
  { value: 'article-top', label: 'Article - Top', size: 'medium-rectangle' },
  { value: 'article-middle', label: 'Article - Middle', size: 'medium-rectangle' },
  { value: 'article-bottom', label: 'Article - Bottom', size: 'medium-rectangle' },
  { value: 'sidebar', label: 'Sidebar', size: 'medium-rectangle' },
  { value: 'category-top', label: 'Category - Top', size: 'leaderboard' },
];

export default function NewAdPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ad, setAd] = useState({
    title: '',
    imageUrl: '',
    linkUrl: '',
    position: '',
    status: 'active' as 'active' | 'paused' | 'scheduled',
    startDate: '',
    endDate: '',
  });

  const getSizeForPosition = (pos: string) => {
    const p = positions.find(p => p.value === pos);
    return p?.size || 'medium-rectangle';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      createAd({
        title: ad.title,
        imageUrl: ad.imageUrl,
        linkUrl: ad.linkUrl,
        position: ad.position,
        size: getSizeForPosition(ad.position) as 'leaderboard' | 'medium-rectangle' | 'large-rectangle' | 'wide-skyscraper',
        status: ad.status,
        startDate: ad.startDate,
        endDate: ad.endDate,
      });

      router.push('/admin/ads/');
    } catch (error) {
      console.error('Failed to create ad:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/admin/ads/" className="hover:text-primary-600">Advertisements</Link>
          <span>/</span>
          <span>Create Ad</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Ad</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Ad Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title *</label>
                <input
                  type="text"
                  required
                  value={ad.title}
                  onChange={(e) => setAd({ ...ad, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="e.g., Summer Sale 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Image URL *</label>
                <input
                  type="url"
                  required
                  value={ad.imageUrl}
                  onChange={(e) => setAd({ ...ad, imageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="https://example.com/ad-image.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">Recommended size based on position will be used</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target URL *</label>
                <input
                  type="url"
                  required
                  value={ad.linkUrl}
                  onChange={(e) => setAd({ ...ad, linkUrl: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Scheduling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date (Optional)</label>
                <input
                  type="date"
                  value={ad.startDate}
                  onChange={(e) => setAd({ ...ad, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                <input
                  type="date"
                  value={ad.endDate}
                  onChange={(e) => setAd({ ...ad, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Placement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <select
                  required
                  value={ad.position}
                  onChange={(e) => setAd({ ...ad, position: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Position</option>
                  {positions.map((pos) => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={ad.status}
                  onChange={(e) => setAd({ ...ad, status: e.target.value as 'active' | 'paused' | 'scheduled' })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              {ad.imageUrl ? (
                <img
                  src={ad.imageUrl}
                  alt="Ad preview"
                  className="max-w-full h-auto rounded-lg mx-auto"
                  style={{ maxHeight: '150px' }}
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-24 flex items-center justify-center text-gray-400 text-sm">
                  Ad Preview
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/ads/')}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !ad.title || !ad.imageUrl || !ad.linkUrl || !ad.position}
              className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Ad'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
