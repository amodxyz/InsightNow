'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'InsightNow',
    siteUrl: 'https://insightnow.amodkumar.com',
    description: 'Your trusted source for breaking news and comprehensive coverage.',
    email: 'contact@amodkumar.com',
    twitter: '@insightnow',
    facebook: 'insightnow',
    articlesPerPage: '10',
    allowComments: true,
    enableNewsletter: true,
  });

  const [adsense, setAdsense] = useState({
    enabled: true,
    publisherId: 'ca-pub-8725656527291179',
    homepageTop: true,
    homepageMiddle: true,
    articleTop: true,
    articleMiddle: true,
    articleBottom: true,
    sidebar: true,
    categoryTop: true,
  });

  const [customAds, setCustomAds] = useState([
    { id: 1, name: 'Homepage Top Banner', slot: '1234567890', size: '728x90', enabled: true },
    { id: 2, name: 'Sidebar Ad', slot: '9876543210', size: '300x250', enabled: true },
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your website settings</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
              <textarea
                rows={3}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Google AdSense Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Google AdSense</h2>
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Enable AdSense</p>
              <p className="text-sm text-gray-500">Show Google AdSense advertisements</p>
            </div>
            <button
              onClick={() => setAdsense({ ...adsense, enabled: !adsense.enabled })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                adsense.enabled ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  adsense.enabled ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publisher ID</label>
              <input
                type="text"
                value={adsense.publisherId}
                onChange={(e) => setAdsense({ ...adsense, publisherId: e.target.value })}
                placeholder="ca-pub-xxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">Found in your Google AdSense account → Settings → Account Information</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-4">Ad Placements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'homepageTop', label: 'Homepage - Top (Leaderboard 728x90)' },
                { key: 'homepageMiddle', label: 'Homepage - Middle (Leaderboard 728x90)' },
                { key: 'articleTop', label: 'Article - Top (Auto)' },
                { key: 'articleMiddle', label: 'Article - Middle (Auto)' },
                { key: 'articleBottom', label: 'Article - Bottom (Auto)' },
                { key: 'sidebar', label: 'Sidebar (300x250)' },
                { key: 'categoryTop', label: 'Category - Top (Leaderboard 728x90)' },
              ].map((placement) => (
                <div key={placement.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-700">{placement.label}</span>
                  <button
                    onClick={() => setAdsense({ ...adsense, [placement.key]: !adsense[placement.key as keyof typeof adsense] })}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      adsense[placement.key as keyof typeof adsense] ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        adsense[placement.key as keyof typeof adsense] ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Ad Slots */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Custom Ad Slots</h2>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
              Add New Slot
            </button>
          </div>

          <div className="space-y-4">
            {customAds.map((ad) => (
              <div key={ad.id} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{ad.name}</p>
                    <p className="text-sm text-gray-500">Slot: {ad.slot} | Size: {ad.size}</p>
                  </div>
                  <button
                    onClick={() => setCustomAds(customAds.map(a => a.id === ad.id ? { ...a, enabled: !a.enabled } : a))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      ad.enabled ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        ad.enabled ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Edit</button>
                  <button className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
              <input
                type="text"
                value={settings.twitter}
                onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input
                type="text"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Content Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Articles Per Page</label>
              <select
                value={settings.articlesPerPage}
                onChange={(e) => setSettings({ ...settings, articlesPerPage: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Allow Comments</p>
                <p className="text-sm text-gray-500">Enable comments on articles</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, allowComments: !settings.allowComments })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.allowComments ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.allowComments ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Newsletter</p>
                <p className="text-sm text-gray-500">Enable newsletter subscription</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, enableNewsletter: !settings.enableNewsletter })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.enableNewsletter ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.enableNewsletter ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
