import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Search News | Find Articles & Headlines',
  description: 'Search InsightNow for the latest news articles, headlines, and breaking stories across all categories. Find news on technology, business, sports, entertainment, health, and more.',
  keywords: [
    'search news',
    'find articles',
    'news search',
    'search headlines',
    'find news',
    'article search',
    'news finder',
    'search topics',
    'find stories',
    'browse news',
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <>
      <Header categories={categories} />
      <main className="flex-grow bg-gray-50">
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Search Articles</h1>
            <p className="text-primary-100 text-lg">Find news, topics, and stories across all categories</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <form method="GET" action="/search/" className="mb-12">
              <div className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Search for news, topics, authors..."
                  className="w-full px-6 py-5 pl-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all shadow-lg"
                  autoFocus
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            <div className="bg-white rounded-2xl p-8 shadow-card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Popular Search Terms</h2>
              <p className="text-gray-500 mb-6">Click on a topic to search</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Technology', 'Business', 'Sports', 'AI', 'Health', 'Science', 'Entertainment', 'Breaking News', 'Trending'].map((term) => (
                  <a
                    key={term}
                    href={`/search/?q=${encodeURIComponent(term)}`}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-primary-100 hover:text-primary-700 transition-all"
                  >
                    {term}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
