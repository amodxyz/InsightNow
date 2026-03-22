import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import HeroSlider from '@/components/HeroSlider';
import { AdBetweenSections, AdInHomepage } from '@/components/Ads';

export const metadata: Metadata = {
  title: 'InsightNow | Breaking News, Latest Headlines & In-Depth Analysis',
  description: 'Stay informed with InsightNow - Your trusted source for breaking news, latest headlines, in-depth analysis, and comprehensive coverage.',
};

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  authorId: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  status: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  articleCount: number;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', icon: '💻', description: 'Latest tech news', articleCount: 2 },
  { id: '2', name: 'Business', slug: 'business', icon: '📈', description: 'Business updates', articleCount: 1 },
  { id: '3', name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sports news', articleCount: 1 },
  { id: '4', name: 'Entertainment', slug: 'entertainment', icon: '🎬', description: 'Movies & more', articleCount: 1 },
  { id: '5', name: 'Health', slug: 'health', icon: '🏥', description: 'Health tips', articleCount: 1 },
  { id: '6', name: 'Science', slug: 'science', icon: '🔬', description: 'Scientific discoveries', articleCount: 1 },
];

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Breaking: Major Tech Companies Announce Revolutionary AI Partnership',
    slug: 'tech-companies-ai-partnership',
    excerpt: 'Leading technology giants have joined forces to create unprecedented advances in artificial intelligence research.',
    content: '<p>In a landmark announcement today, several of the world\'s largest technology companies revealed a groundbreaking partnership.</p>',
    category: 'Technology',
    categorySlug: 'technology',
    author: 'Sarah Johnson',
    authorId: '1',
    publishedAt: '2026-03-19',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['AI', 'Technology'],
    readTime: 5,
    featured: true,
    status: 'published',
  },
  {
    id: '2',
    title: 'Global Markets Rally as Economic Indicators Show Growth',
    slug: 'global-markets-rally',
    excerpt: 'Stock markets worldwide surge following positive economic data releases.',
    content: '<p>Financial markets across the globe experienced significant gains today.</p>',
    category: 'Business',
    categorySlug: 'business',
    author: 'Mike Chen',
    authorId: '1',
    publishedAt: '2026-03-18',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['Markets', 'Economy'],
    readTime: 4,
    featured: true,
    status: 'published',
  },
  {
    id: '3',
    title: 'Historic Championship Victory Breaks 50-Year Drought',
    slug: 'historic-championship-victory',
    excerpt: 'Team celebrates after winning their first championship in half a century.',
    content: '<p>In a thrilling finale, the team secured their first championship title in 50 years.</p>',
    category: 'Sports',
    categorySlug: 'sports',
    author: 'Sarah Johnson',
    authorId: '1',
    publishedAt: '2026-03-17',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop',
    tags: ['Sports', 'Championship'],
    readTime: 6,
    featured: false,
    status: 'published',
  },
  {
    id: '4',
    title: 'New Blockbuster Movie Breaks Opening Weekend Records',
    slug: 'blockbuster-opening-weekend',
    excerpt: 'Highly anticipated film exceeds all box office expectations.',
    content: '<p>The newest addition to the blockbuster franchise has shattered opening weekend records.</p>',
    category: 'Entertainment',
    categorySlug: 'entertainment',
    author: 'Mike Chen',
    authorId: '1',
    publishedAt: '2026-03-16',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    tags: ['Movies', 'Entertainment'],
    readTime: 3,
    featured: false,
    status: 'published',
  },
  {
    id: '5',
    title: 'Revolutionary Treatment Shows Promise for Common Disease',
    slug: 'revolutionary-treatment',
    excerpt: 'Medical breakthrough offers new hope for millions of patients.',
    content: '<p>Researchers have announced a groundbreaking treatment that could transform healthcare.</p>',
    category: 'Health',
    categorySlug: 'health',
    author: 'Sarah Johnson',
    authorId: '1',
    publishedAt: '2026-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
    tags: ['Health', 'Medical'],
    readTime: 5,
    featured: false,
    status: 'published',
  },
  {
    id: '6',
    title: 'Scientists Discover New Species in Deep Ocean Exploration',
    slug: 'new-species-discovery',
    excerpt: 'Deep sea expedition reveals previously unknown marine life.',
    content: '<p>A team of marine biologists has discovered several new species during their latest expedition.</p>',
    category: 'Science',
    categorySlug: 'science',
    author: 'Mike Chen',
    authorId: '1',
    publishedAt: '2026-03-14',
    imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=400&fit=crop',
    tags: ['Science', 'Ocean'],
    readTime: 4,
    featured: false,
    status: 'published',
  },
  {
    id: '7',
    title: 'Space Agency Announces Plans for Mars Colony',
    slug: 'mars-colony-plans',
    excerpt: 'Ambitious timeline set for establishing permanent human presence on Mars.',
    content: '<p>The space agency has unveiled detailed plans for establishing the first permanent colony on Mars.</p>',
    category: 'Science',
    categorySlug: 'science',
    author: 'Sarah Johnson',
    authorId: '1',
    publishedAt: '2026-03-13',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=400&fit=crop',
    tags: ['Space', 'Mars'],
    readTime: 7,
    featured: true,
    status: 'published',
  },
  {
    id: '8',
    title: 'Tech Giant Unveils Next-Generation Smartphone',
    slug: 'next-gen-smartphone',
    excerpt: 'Revolutionary features set to redefine mobile computing.',
    content: '<p>The latest flagship smartphone promises unprecedented performance and innovative features.</p>',
    category: 'Technology',
    categorySlug: 'technology',
    author: 'Mike Chen',
    authorId: '1',
    publishedAt: '2026-03-12',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=400&fit=crop',
    tags: ['Technology', 'Smartphone'],
    readTime: 4,
    featured: false,
    status: 'published',
  },
];

function getData(): { articles: Article[]; categories: Category[] } {
  if (typeof window === 'undefined') {
    return { articles: defaultArticles, categories: defaultCategories };
  }
  
  const storedArticles = localStorage.getItem('insightnow_articles');
  const storedCategories = localStorage.getItem('insightnow_categories');
  
  const articles: Article[] = storedArticles ? JSON.parse(storedArticles) : defaultArticles;
  const categories: Category[] = storedCategories ? JSON.parse(storedCategories) : defaultCategories;
  
  return { articles, categories };
}

export default function HomePage() {
  const { articles, categories } = getData();
  const publishedArticles = articles.filter((a: Article) => a.status === 'published');
  const sliderArticles = publishedArticles.slice(0, 4);
  const latestArticles = publishedArticles.slice(1, 7);

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
              {latestArticles.map((article: Article) => (
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
              {categories.map((cat: Category, index: number) => (
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
                    {articles.filter((a: Article) => a.categorySlug === cat.slug).length} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
