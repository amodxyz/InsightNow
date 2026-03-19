'use client';

import { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  uploadedAt: string;
}

const sampleMedia: MediaItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop', name: 'ai-technology.jpg', type: 'image', size: '245 KB', uploadedAt: '2026-03-19' },
  { id: '2', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop', name: 'markets-chart.jpg', type: 'image', size: '189 KB', uploadedAt: '2026-03-18' },
  { id: '3', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', name: 'championship.jpg', type: 'image', size: '312 KB', uploadedAt: '2026-03-17' },
  { id: '4', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop', name: 'movie-premiere.jpg', type: 'image', size: '278 KB', uploadedAt: '2026-03-16' },
  { id: '5', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop', name: 'medical-research.jpg', type: 'image', size: '198 KB', uploadedAt: '2026-03-15' },
  { id: '6', url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&h=300&fit=crop', name: 'ocean-discovery.jpg', type: 'image', size: '256 KB', uploadedAt: '2026-03-14' },
  { id: '7', url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=300&fit=crop', name: 'mars-colony.jpg', type: 'image', size: '342 KB', uploadedAt: '2026-03-13' },
  { id: '8', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop', name: 'smartphone.jpg', type: 'image', size: '167 KB', uploadedAt: '2026-03-12' },
];

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedUrl, setCopiedUrl] = useState('');

  useEffect(() => {
    const savedMedia = localStorage.getItem('insightnow_media');
    if (savedMedia) {
      setMedia(JSON.parse(savedMedia));
    } else {
      setMedia(sampleMedia);
      localStorage.setItem('insightnow_media', JSON.stringify(sampleMedia));
    }
  }, []);

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this media?')) {
      const updated = media.filter(m => m.id !== id);
      setMedia(updated);
      localStorage.setItem('insightnow_media', JSON.stringify(updated));
      setSelectedItem(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 mt-1">Upload and manage your images</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Media
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
              selectedItem?.id === item.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <span className="text-4xl mb-4 block">🖼️</span>
          <p className="text-gray-500">No media found</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Media Details</h2>
              <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <img src={selectedItem.url} alt={selectedItem.name} className="w-full rounded-xl" />
              
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Filename</label>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Size</label>
                    <p className="font-medium">{selectedItem.size}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Uploaded</label>
                    <p className="font-medium">{selectedItem.uploadedAt}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedItem.url}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedItem.url)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        copiedUrl === selectedItem.url
                          ? 'bg-green-100 text-green-700'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {copiedUrl === selectedItem.url ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => copyToClipboard(selectedItem.url)}
                  className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => handleDelete(selectedItem.id)}
                  className="px-4 py-2.5 border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
