'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const initialCategories = [
  { name: 'Technology', slug: 'technology', icon: '💻', description: 'Latest tech news and innovations', articleCount: 0 },
  { name: 'Business', slug: 'business', icon: '📈', description: 'Business and market updates', articleCount: 0 },
  { name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sports news and scores', articleCount: 0 },
  { name: 'Entertainment', slug: 'entertainment', icon: '🎬', description: 'Movies, music, and celebrity news', articleCount: 0 },
  { name: 'Health', slug: 'health', icon: '🏥', description: 'Health tips and medical news', articleCount: 0 },
  { name: 'Science', slug: 'science', icon: '🔬', description: 'Scientific discoveries and research', articleCount: 0 },
];

const initialUsers = [
  { name: 'Admin User', email: 'admin@amodkumar.com', role: 'admin', avatar: '', bio: 'Site administrator', createdAt: new Date().toISOString(), lastLogin: '' },
  { name: 'Sarah Johnson', email: 'sarah@amodkumar.com', role: 'editor', avatar: '', bio: 'Senior Editor', createdAt: new Date().toISOString(), lastLogin: '' },
  { name: 'Mike Chen', email: 'mike@amodkumar.com', role: 'author', avatar: '', bio: 'Tech Writer', createdAt: new Date().toISOString(), lastLogin: '' },
];

const initialArticles = [
  {
    title: 'Breaking: Major Tech Companies Announce Revolutionary AI Partnership',
    slug: 'tech-companies-ai-partnership',
    excerpt: 'Leading technology giants have joined forces to create unprecedented advances in artificial intelligence research and development.',
    content: '<p>In a landmark announcement today, several of the world\'s largest technology companies revealed a groundbreaking partnership aimed at accelerating artificial intelligence research.</p><h2>The Partnership Details</h2><p>The collaboration brings together expertise from multiple sectors, pooling resources to tackle some of the most challenging problems in AI development.</p><ul><li>Shared research facilities across three continents</li><li>Joint development of open-source AI tools</li><li>Combined investment of $10 billion over five years</li><li>Ethical AI framework development</li></ul><h2>Industry Impact</h2><p>Analysts predict this partnership could reshape the competitive landscape of the AI industry.</p>',
    category: 'Technology',
    categorySlug: 'technology',
    author: 'Sarah Johnson',
    authorId: 'user-2',
    publishedAt: '2026-03-19',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['AI', 'Technology', 'Partnerships'],
    readTime: 5,
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Global Markets Rally as Economic Indicators Show Strong Growth',
    slug: 'global-markets-rally',
    excerpt: 'Stock markets worldwide surge following positive economic data releases.',
    content: '<p>Financial markets across the globe experienced significant gains today as new economic data suggested stronger-than-expected growth.</p><h2>Market Performance</h2><p>Major indices posted impressive gains, with technology and financial sectors leading the charge.</p>',
    category: 'Business',
    categorySlug: 'business',
    author: 'Mike Chen',
    authorId: 'user-3',
    publishedAt: '2026-03-18',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['Markets', 'Economy', 'Business'],
    readTime: 4,
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Historic Championship Victory Breaks 50-Year Drought',
    slug: 'historic-championship-victory',
    excerpt: 'Team celebrates after winning their first championship in half a century.',
    content: '<p>In a thrilling finale that will be remembered for generations, the team secured their first championship title in 50 years.</p><h2>The Journey</h2><p>Years of dedication, strategic acquisitions, and relentless training culminated in this historic moment.</p>',
    category: 'Sports',
    categorySlug: 'sports',
    author: 'Sarah Johnson',
    authorId: 'user-2',
    publishedAt: '2026-03-17',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop',
    tags: ['Sports', 'Championship', 'Victory'],
    readTime: 6,
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialAds = [
  {
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
    createdAt: new Date().toISOString(),
  },
  {
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
    createdAt: new Date().toISOString(),
  },
];

export default function SetupPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [totalSteps, setTotalSteps] = useState(4);
  const [currentStep, setCurrentStep] = useState(0);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') === 'true') {
      setExists(false);
      setStatus('idle');
    } else {
      checkExistingData();
    }
  }, []);

  const checkExistingData = async () => {
    try {
      const categoriesRef = collection(db, 'categories');
      const snapshot = await getDocs(categoriesRef);
      if (!snapshot.empty) {
        setExists(true);
        setMessage('Data already exists in Firestore!');
      }
    } catch (error) {
      console.error('Error checking data:', error);
    }
  };

  const updateProgress = (step: number) => {
    setCurrentStep(step);
    setProgress(Math.round((step / totalSteps) * 100));
  };

  const setupData = async () => {
    setStatus('loading');
    setMessage('Setting up your database...');
    setTotalSteps(4);

    try {
      // Step 1: Categories
      updateProgress(1);
      setMessage('Creating categories...');
      for (const category of initialCategories) {
        await addDoc(collection(db, 'categories'), category);
      }

      // Step 2: Users
      updateProgress(2);
      setMessage('Creating users...');
      for (const user of initialUsers) {
        await addDoc(collection(db, 'users'), user);
      }

      // Step 3: Articles
      updateProgress(3);
      setMessage('Creating articles...');
      for (const article of initialArticles) {
        await addDoc(collection(db, 'articles'), article);
      }

      // Step 4: Ads
      updateProgress(4);
      setMessage('Creating ads...');
      for (const ad of initialAds) {
        await addDoc(collection(db, 'ads'), ad);
      }

      // Add settings document
      await setDoc(doc(db, 'settings', 'site'), {
        siteName: 'InsightNow',
        siteDescription: 'Your trusted source for breaking news',
        socialLinks: {
          twitter: 'https://twitter.com/insightnow',
          facebook: 'https://facebook.com/insightnow',
        },
        seo: {
          defaultTitle: 'InsightNow | Breaking News',
          defaultDescription: 'Stay informed with the latest breaking news',
          keywords: ['news', 'breaking news', 'headlines'],
        },
      });

      setProgress(100);
      setStatus('success');
      setMessage('Setup complete! Your database is ready.');
    } catch (error) {
      console.error('Setup error:', error);
      setStatus('error');
      setMessage('Error setting up database. Please check your Firebase configuration.');
    }
  };

  if (exists && status !== 'success') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Already Set Up!</h1>
          <p className="text-gray-500 mb-6">{message}</p>
          <div className="space-y-3">
            <Link
              href="/admin/login"
              className="block w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Go to Login
            </Link>
            <Link
              href="/setup?reset=true"
              className="block w-full px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Reset Data
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">InsightNow Setup</h1>
          <p className="text-gray-500">Initialize your Firestore database with sample data</p>
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{message}</span>
                <span className="text-primary-600 font-medium">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-green-600' : ''}`}>
                {currentStep >= 1 ? '✅' : '○'} Categories
              </div>
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-green-600' : ''}`}>
                {currentStep >= 2 ? '✅' : '○'} Users
              </div>
              <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-green-600' : ''}`}>
                {currentStep >= 3 ? '✅' : '○'} Articles
              </div>
              <div className={`flex items-center gap-2 ${currentStep >= 4 ? 'text-green-600' : ''}`}>
                {currentStep >= 4 ? '✅' : '○'} Ads
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🎉</span>
            </div>
            <p className="text-green-600 font-medium">{message}</p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors text-center"
              >
                Go to Website
              </Link>
              <Link
                href="/admin/"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">❌</span>
            </div>
            <p className="text-red-600">{message}</p>
            <button
              onClick={setupData}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'idle' && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
              <p className="font-medium mb-2">This will add:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>6 Categories</li>
                <li>3 Users</li>
                <li>3 Sample Articles</li>
                <li>2 Advertisements</li>
              </ul>
            </div>
            <button
              onClick={setupData}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Start Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
