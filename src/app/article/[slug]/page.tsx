import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import CommentsSection from '@/components/CommentsSection';
import { AdInArticle } from '@/components/Ads';
import { articles, categories, getArticleBySlug, getRelatedArticles, formatDate } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const keywords = [
    ...article.tags,
    article.category,
    article.author,
    'news',
    'breaking news',
    'latest news',
    'headlines',
  ];

  return {
    title: article.title,
    description: article.excerpt,
    keywords: keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      section: article.category,
      images: [{ url: article.imageUrl, width: 800, height: 400, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'InsightNow',
      logo: { '@type': 'ImageObject', url: 'https://yournewssite.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://yournewssite.com/article/${article.slug}/` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header categories={categories} />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <nav className="flex items-center gap-2 text-sm px-4 sm:px-6 py-4 border-b border-gray-100">
                  <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">Home</Link>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <Link href={`/category/${article.categorySlug}/`} className="text-gray-500 hover:text-primary-600 transition-colors">{article.category}</Link>
                  <svg className="w-4 h-4 text-gray-400 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700 truncate max-w-[150px] sm:max-w-[200px] hidden sm:inline">{article.title}</span>
                </nav>

                <AdInArticle position="top" />

                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px]">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
                      {article.category}
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {article.title}
                    </h1>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-base sm:text-lg">{article.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{article.author}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Author</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 ml-auto">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.readTime} min read
                      </span>
                    </div>
                  </div>

                  <div className="py-6 sm:py-8">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 font-medium bg-primary-50 p-4 sm:p-6 rounded-xl border-l-4 border-primary-500">
                      {article.excerpt}
                    </p>
                    <div className="article-content text-gray-700 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>

                  <AdInArticle position="middle" />

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/search/?q=${encodeURIComponent(tag)}`}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium hover:bg-primary-100 hover:text-primary-700 transition-all"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <AdInArticle position="bottom" />

                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 text-sm sm:text-base">Share this article:</span>
                      <div className="flex gap-2 sm:gap-3">
                        {['twitter', 'facebook', 'linkedin'].map((platform) => (
                          <button key={platform} className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-lg transition-all border border-gray-200">
                            <span className="text-xs sm:text-sm capitalize">{platform.charAt(0)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {relatedArticles.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {relatedArticles.map((related) => (
                      <ArticleCard key={related.id} article={related} />
                    ))}
                  </div>
                </section>
              )}

              <CommentsSection articleSlug={article.slug} />
            </div>
            
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
