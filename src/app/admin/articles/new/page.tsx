'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  articleCount: number;
}

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    categorySlug: '',
    author: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    imageUrl: '',
    featured: false,
    publishedAt: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const stored = localStorage.getItem('insightnow_categories');
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setArticle({ ...article, imageUrl: reader.result as string });
      setUploading(false);
    };
    reader.onerror = () => {
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleContentChange = (html: string) => {
    setArticle({ ...article, content: html });
  };

  const handleCategoryChange = (name: string) => {
    const cat = categories.find(c => c.name === name);
    setArticle({ 
      ...article, 
      category: name,
      categorySlug: cat?.slug || name.toLowerCase().replace(/\s+/g, '-')
    });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleSubmit = (e: React.FormEvent, publishStatus: 'draft' | 'published') => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = article.tags.split(',').map(t => t.trim()).filter(Boolean);
    const slug = article.slug || generateSlug(article.title);
    
    const newArticle = {
      id: Date.now().toString(),
      title: article.title,
      slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      categorySlug: article.categorySlug,
      author: article.author || 'Admin',
      authorId: '1',
      publishedAt: article.publishedAt,
      imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
      tags: tagsArray,
      readTime: calculateReadTime(article.content),
      featured: article.featured,
      status: publishStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const stored = localStorage.getItem('insightnow_articles');
    const articles = stored ? JSON.parse(stored) : [];
    articles.unshift(newArticle);
    localStorage.setItem('insightnow_articles', JSON.stringify(articles));

    router.push('/admin/articles/');
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/admin/articles/" className="hover:text-primary-600">Articles</Link>
          <span>/</span>
          <span>New Article</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Article</h1>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={article.slug}
                  onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="article-url-slug"
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
                  placeholder="Brief description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <RichTextEditor 
                  value={article.content} 
                  onChange={handleContentChange}
                  placeholder="Start writing..."
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <input
                  type="date"
                  value={article.publishedAt}
                  onChange={(e) => setArticle({ ...article, publishedAt: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={article.featured}
                  onChange={(e) => setArticle({ ...article, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'draft')}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'published')}
                  disabled={isSubmitting || !article.title || !article.excerpt}
                  className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
            <select
              value={article.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Featured Image</h3>
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div 
                className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {article.imageUrl ? (
                  <div className="relative">
                    <img src={article.imageUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setArticle({ ...article, imageUrl: '' }); }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    {uploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent mx-auto"></div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <input
                type="url"
                value={article.imageUrl}
                onChange={(e) => setArticle({ ...article, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
                placeholder="Or paste image URL here..."
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Author</h3>
            <input
              type="text"
              value={article.author}
              onChange={(e) => setArticle({ ...article, author: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
              placeholder="Author name"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
