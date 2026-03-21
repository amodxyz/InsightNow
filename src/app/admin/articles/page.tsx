'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
  imageUrl: string;
  readTime: number;
}

const defaultArticles: Article[] = [
  { id: '1', title: 'Breaking: Major Tech Companies Announce AI Partnership', slug: 'tech-companies-ai-partnership', excerpt: 'Leading tech giants announce partnership', category: 'Technology', author: 'Sarah Johnson', status: 'published', publishedAt: '2026-03-19', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', readTime: 5 },
  { id: '2', title: 'Global Markets Rally as Economic Indicators Show Growth', slug: 'global-markets-rally', excerpt: 'Markets surge globally', category: 'Business', author: 'Mike Chen', status: 'published', publishedAt: '2026-03-18', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', readTime: 4 },
  { id: '3', title: 'Historic Championship Victory Breaks 50-Year Drought', slug: 'historic-championship-victory', excerpt: 'Team wins first championship', category: 'Sports', author: 'Sarah Johnson', status: 'published', publishedAt: '2026-03-17', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400', readTime: 6 },
];

const statusColors: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
  archived: 'bg-gray-100 text-gray-700',
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('insightnow_articles');
    if (stored) {
      setArticles(JSON.parse(stored));
    } else {
      setArticles(defaultArticles);
      localStorage.setItem('insightnow_articles', JSON.stringify(defaultArticles));
    }
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      localStorage.setItem('insightnow_articles', JSON.stringify(updated));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500 mt-1">Manage your news articles</p>
        </div>
        <Link href="/admin/articles/new/" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Article
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Article</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">Author</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={article.imageUrl} alt="" className="w-16 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{article.title}</p>
                        <p className="text-sm text-gray-500">{article.readTime} min read</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{article.category}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{article.author}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[article.status]}`}>{article.status}</span></td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{formatDate(article.publishedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/article/${article.slug}/`} target="_blank" className="p-2 text-gray-400 hover:text-primary-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></Link>
                      <Link href={`/admin/articles/edit/${article.id}/`} className="p-2 text-gray-400 hover:text-primary-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                      <button onClick={() => handleDelete(article.id, article.title)} className="p-2 text-gray-400 hover:text-red-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
