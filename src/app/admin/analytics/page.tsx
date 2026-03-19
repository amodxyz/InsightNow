'use client';

import { useState, useEffect } from 'react';
import { getArticles, getComments, initializeStorage } from '@/lib/storage';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    initializeStorage();
  }, []);

  const pageViews = 12543;
  const uniqueVisitors = 8234;
  const avgSessionDuration = '3m 24s';
  const bounceRate = '42%';

  const topArticles = [
    { title: 'Major Tech Companies AI Partnership', views: 2450, change: '+12%' },
    { title: 'Global Markets Rally', views: 1890, change: '+8%' },
    { title: 'Historic Championship Victory', views: 1560, change: '+5%' },
    { title: 'Blockbuster Movie Records', views: 1340, change: '+3%' },
    { title: 'Revolutionary Treatment Shows Promise', views: 1120, change: '-2%' },
  ];

  const trafficSources = [
    { source: 'Direct', visits: 4521, percent: 36 },
    { source: 'Search', visits: 3890, percent: 31 },
    { source: 'Social', visits: 2512, percent: 20 },
    { source: 'Referral', visits: 1620, percent: 13 },
  ];

  const categoryPerformance = [
    { category: 'Technology', views: 4521, articles: 2 },
    { category: 'Business', views: 3210, articles: 1 },
    { category: 'Science', views: 2890, articles: 2 },
    { category: 'Sports', views: 1980, articles: 1 },
    { category: 'Entertainment', views: 1542, articles: 1 },
    { category: 'Health', views: 1230, articles: 1 },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Track your website performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="365d">Last year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Page Views', value: pageViews.toLocaleString(), change: '+15%', icon: '👁️', color: 'bg-blue-500' },
          { label: 'Unique Visitors', value: uniqueVisitors.toLocaleString(), change: '+12%', icon: '👤', color: 'bg-purple-500' },
          { label: 'Avg. Session', value: avgSessionDuration, change: '+8%', icon: '⏱️', color: 'bg-green-500' },
          { label: 'Bounce Rate', value: bounceRate, change: '-5%', icon: '📊', color: 'bg-orange-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Articles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Articles</h3>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div key={article.title} className="flex items-center gap-4">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-500">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{article.title}</p>
                  <p className="text-sm text-gray-500">{article.views.toLocaleString()} views</p>
                </div>
                <span className={`text-sm font-medium ${article.change.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                  {article.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <span className="text-sm text-gray-500">{source.visits.toLocaleString()} ({source.percent}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all"
                    style={{ width: `${source.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Category Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Articles</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Views</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Avg. Views/Article</th>
              </tr>
            </thead>
            <tbody>
              {categoryPerformance.map((cat) => (
                <tr key={cat.category} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{cat.category}</td>
                  <td className="py-3 px-4 text-gray-600">{cat.articles}</td>
                  <td className="py-3 px-4 text-gray-600">{cat.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{(cat.views / cat.articles).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
