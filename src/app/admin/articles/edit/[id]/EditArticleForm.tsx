'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/admin/RichTextEditor';

const categories = ['technology', 'business', 'sports', 'entertainment', 'health', 'science'];

export default function EditArticleForm() {
  const [article, setArticle] = useState({
    id: '1',
    title: 'Breaking: Major Tech Companies Announce Revolutionary AI Partnership',
    slug: 'tech-companies-ai-partnership',
    excerpt: 'Leading technology giants have joined forces to create unprecedented advances in artificial intelligence research and development.',
    content: '<p>In a landmark announcement today, several of the world\'s largest technology companies revealed a groundbreaking partnership aimed at accelerating artificial intelligence research.</p><h2>The Partnership Details</h2><p>The collaboration brings together expertise from multiple sectors, pooling resources to tackle some of the most challenging problems in AI development.</p><ul><li>Shared research facilities across three continents</li><li>Joint development of open-source AI tools</li><li>Combined investment of $10 billion over five years</li><li>Ethical AI framework development</li></ul><h2>Industry Impact</h2><p>Analysts predict this partnership could reshape the competitive landscape of the AI industry, potentially accelerating timeline for breakthrough innovations.</p>',
    category: 'technology',
    author: 'Sarah Johnson',
    tags: 'AI, Technology, Partnerships',
    status: 'published',
    imageUrl: '',
    readTime: 5,
  });

  const handleContentChange = (html: string) => {
    setArticle({ ...article, content: html });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Article updated:', article);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={article.slug}
                onChange={(e) => setArticle({ ...article, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <textarea
                rows={3}
                required
                value={article.excerpt}
                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <RichTextEditor 
                value={article.content} 
                onChange={handleContentChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={article.title}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={article.excerpt}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Publish</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={article.status}
                onChange={(e) => setArticle({ ...article, status: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
          <select
            value={article.category}
            onChange={(e) => setArticle({ ...article, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
          <input
            type="text"
            value={article.tags}
            onChange={(e) => setArticle({ ...article, tags: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Author</h3>
          <input
            type="text"
            value={article.author}
            onChange={(e) => setArticle({ ...article, author: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Read Time</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              value={article.readTime}
              onChange={(e) => setArticle({ ...article, readTime: parseInt(e.target.value) || 5 })}
              className="w-20 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
            <span className="text-gray-500 text-sm">minutes</span>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <h3 className="font-semibold text-red-700 mb-3">Danger Zone</h3>
          <button
            type="button"
            className="w-full px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
          >
            Delete Article
          </button>
        </div>
      </div>
    </form>
  );
}
