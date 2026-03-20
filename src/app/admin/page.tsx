'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { getArticles, getComments, initializeStorage } from '@/lib/storage';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ articles: 0, users: 0, comments: 0, ads: 0 });

  useEffect(() => {
    initializeStorage();
    const data = JSON.parse(localStorage.getItem('insightnow_data') || '{}');
    setStats({
      articles: data.articles?.length || 0,
      users: data.users?.length || 0,
      comments: data.comments?.length || 0,
      ads: data.ads?.length || 0,
    });
  }, []);

  const dashboardStats = [
    { label: 'Total Articles', value: stats.articles.toString(), change: '+2 this week', color: 'bg-blue-500', icon: '📰' },
    { label: 'Users', value: stats.users.toString(), change: '+1 this month', color: 'bg-purple-500', icon: '👥' },
    { label: 'Comments', value: stats.comments.toString(), change: '+12 this week', color: 'bg-green-500', icon: '💬' },
    { label: 'Ads', value: stats.ads.toString(), change: 'Active', color: 'bg-orange-500', icon: '📊' },
  ];

  const quickActions = [
    { name: 'New Article', href: '/admin/articles/new/', emoji: '✏️', color: 'bg-primary-50 hover:bg-primary-100', textColor: 'text-primary-700' },
    { name: 'Media Library', href: '/admin/media/', emoji: '🖼️', color: 'bg-purple-50 hover:bg-purple-100', textColor: 'text-purple-700' },
    { name: 'Analytics', href: '/admin/analytics/', emoji: '📈', color: 'bg-green-50 hover:bg-green-100', textColor: 'text-green-700' },
    { name: 'Create Ad', href: '/admin/ads/new/', emoji: '📢', color: 'bg-orange-50 hover:bg-orange-100', textColor: 'text-orange-700' },
    { name: 'Add User', href: '/admin/users/', emoji: '👤', color: 'bg-pink-50 hover:bg-pink-100', textColor: 'text-pink-700' },
    { name: 'View Site', href: '/', emoji: '🌐', color: 'bg-gray-50 hover:bg-gray-100', textColor: 'text-gray-700' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back{user ? `, ${user.name}` : ''}! Here&apos;s what&apos;s happening.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <span className="text-white text-xl">{stat.icon}</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            <p className="text-xs text-green-600 mt-2 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors ${action.color}`}
              >
                <span className="text-2xl mb-2">{action.emoji}</span>
                <span className={`text-sm font-medium ${action.textColor}`}>{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-4">
            {[
              { name: 'Website', status: 'Operational', online: true },
              { name: 'Database', status: 'Operational', online: true },
              { name: 'Storage', status: 'Operational', online: true },
              { name: 'Image CDN', status: 'Operational', online: true },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{service.name}</span>
                <span className={`flex items-center gap-1.5 text-xs font-medium ${service.online ? 'text-green-600' : 'text-red-600'}`}>
                  <span className={`w-2 h-2 rounded-full ${service.online ? 'bg-green-500' : 'bg-red-500'}`} />
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Manage Content</h2>
          <div className="space-y-3">
            <Link href="/admin/articles/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">📰</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Articles</p>
                <p className="text-sm text-gray-500">Manage your news articles</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/admin/ads/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">📢</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Advertisements</p>
                <p className="text-sm text-gray-500">Manage ad campaigns</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/admin/categories/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">📁</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Categories</p>
                <p className="text-sm text-gray-500">Organize your content</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Help & Support</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-medium text-gray-900">Getting Started</p>
                <p className="text-sm text-gray-500">Learn how to use the dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <span className="text-xl">📧</span>
              <div>
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">support@amodkumar.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
