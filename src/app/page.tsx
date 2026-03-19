import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import HeroSlider from '@/components/HeroSlider';
import { AdBetweenSections, AdInHomepage } from '@/components/Ads';
import { articles, categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'InsightNow | Breaking News, Latest Headlines & In-Depth Analysis',
  description: 'Stay informed with InsightNow - Your trusted source for breaking news, latest headlines, in-depth analysis, and comprehensive coverage across technology, business, sports, entertainment, health, and science.',
  keywords: [
    'breaking news',
    'latest news',
    'today news',
    'headlines',
    'world news',
    'US news',
    'technology news',
    'business news',
    'sports news',
    'entertainment news',
    'health news',
    'science news',
    'trending news',
    'news updates',
  ],
  openGraph: {
    title: 'InsightNow | Breaking News & Latest Headlines',
    description: 'Get the latest breaking news, headlines, and in-depth analysis from InsightNow.',
    type: 'website',
  },
};

export default function HomePage() {
  const sliderArticles = articles.slice(0, 4);
  const latestArticles = articles.slice(1, 7);

  return (
    <>
      <Header categories={categories} />
      <main className="flex-grow bg-gray-50">
        <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <HeroSlider articles={sliderArticles} />
        </section>

        <AdBetweenSections />

        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest News</h2>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Stay updated with breaking stories</p>
              </div>
              <Link 
                href="/search/" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-xl font-semibold shadow-card hover:shadow-card-hover transition-all text-sm"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        <AdInHomepage />

        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">Explore topics that interest you</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {categories.map((cat, index) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}/`}
                  className="group p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all text-center"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl ${
                    index % 3 === 0 ? 'bg-primary-100 group-hover:bg-primary-200' :
                    index % 3 === 1 ? 'bg-accent-100 group-hover:bg-accent-200' :
                    'bg-emerald-100 group-hover:bg-emerald-200'
                  } transition-colors`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-sm sm:text-base">{cat.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                    {articles.filter(a => a.categorySlug === cat.slug).length} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Never Miss Breaking News</h2>
            <p className="text-primary-100 text-sm sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Subscribe to our newsletter and get daily headlines delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto px-4" action="#" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <AdBetweenSections />

        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trending Stories</h2>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Most read articles this week</p>
                  </div>
                  <div className="hidden md:flex gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium">Hot</span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">New</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                  {articles.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
