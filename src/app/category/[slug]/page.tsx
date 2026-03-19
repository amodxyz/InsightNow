import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { AdBetweenSections } from '@/components/Ads';
import { articles, categories, getArticlesByCategory } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

const categoryKeywords: Record<string, string[]> = {
  technology: [
    'technology news', 'tech news', 'AI', 'artificial intelligence', 'software', 'hardware',
    'gadgets', 'smartphones', 'computers', 'laptops', 'innovation', 'startups', 'apps',
    'cybersecurity', 'cloud computing', 'machine learning', 'data science', 'tech trends',
  ],
  business: [
    'business news', 'economy', 'stock market', 'finance', 'investing', 'startups',
    'entrepreneurship', 'careers', 'real estate', 'cryptocurrency', 'banking', 'trading',
    'corporate news', 'market analysis', 'financial news', 'business trends',
  ],
  sports: [
    'sports news', 'football', 'basketball', 'soccer', 'baseball', 'tennis', 'golf',
    'nba', 'nfl', 'mlb', 'olympics', 'championships', 'sports updates', 'scores',
    'athletes', 'sports analysis', 'league news', 'tournament results',
  ],
  entertainment: [
    'entertainment news', 'movies', 'films', 'tv shows', 'celebrities', 'hollywood',
    'music', 'actors', 'actresses', 'streaming', 'netflix', 'box office', 'celebrity news',
    'movie reviews', 'pop culture', 'awards', 'entertainment industry',
  ],
  health: [
    'health news', 'medical', 'healthcare', 'wellness', 'fitness', 'nutrition', 'diet',
    'mental health', 'diseases', 'treatments', 'medicine', 'doctors', 'hospitals',
    'health tips', 'vaccines', 'research', 'breakthrough treatments', 'healthy lifestyle',
  ],
  science: [
    'science news', 'space', 'nasa', 'space exploration', 'astronomy', 'physics', 'chemistry',
    'biology', 'research', 'discoveries', 'scientists', 'space missions', 'planets',
    'technology', 'innovations', 'scientific breakthroughs', 'laboratory',
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  const keywords = categoryKeywords[slug] || [
    `${category.name.toLowerCase()} news`,
    `${category.name.toLowerCase()} articles`,
    `latest ${category.name.toLowerCase()} news`,
    `${category.name.toLowerCase()} updates`,
  ];

  return {
    title: `${category.name} News | Latest ${category.name} Headlines & Updates`,
    description: `Stay updated with the latest ${category.name.toLowerCase()} news, in-depth articles, and breaking stories. Get comprehensive coverage of ${category.name.toLowerCase()} trends and developments.`,
    keywords: keywords,
    openGraph: {
      title: `${category.name} News | InsightNow`,
      description: `Latest ${category.name.toLowerCase()} news, articles, and updates from InsightNow.`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(slug);

  return (
    <>
      <Header categories={categories} />
      <main className="flex-grow bg-gray-50">
        <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
                {category.icon}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{category.name}</h1>
                <p className="text-primary-100 text-lg">
                  {categoryArticles.length} articles in this category
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdBetweenSections />

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {categoryArticles.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Latest in {category.name}</h2>
                  <p className="text-gray-500 mt-1">Stay informed with the newest stories</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  📰
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
                <p className="text-gray-500">Check back soon for new content in this category.</p>
              </div>
            )}
          </div>
        </section>

        <AdBetweenSections />

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Other Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.filter(c => c.slug !== slug).map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}/`}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-primary-50 hover:shadow-lg transition-all text-center group"
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <span className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors">{cat.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
