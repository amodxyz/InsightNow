import Link from 'next/link';
import Image from 'next/image';
import { Article, formatDate } from '@/lib/data';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative bg-white rounded-xl sm:rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <Link href={`/article/${article.slug}/`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-48 sm:h-64 md:h-full overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-transparent" />
            </div>
            <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-100 text-primary-700 text-[10px] sm:text-xs font-semibold rounded-full">
                  {article.category}
                </span>
                <span className="text-gray-400 text-[10px] sm:text-sm">•</span>
                <time dateTime={article.publishedAt} className="text-gray-500 text-[10px] sm:text-sm">
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] sm:text-sm font-semibold">{article.author.charAt(0)}</span>
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-base">{article.author}</span>
                </div>
                <span className="text-primary-600 font-medium flex items-center gap-1 text-xs sm:text-sm">
                  {article.readTime} min
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl sm:rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <Link href={`/article/${article.slug}/`} className="block">
        <div className="relative h-36 sm:h-48 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute top-2 sm:top-4 left-2 sm:left-4 inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm text-primary-700 text-[10px] sm:text-xs font-semibold rounded-full">
            {article.category}
          </span>
        </div>
        <div className="p-3 sm:p-5">
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-3">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span>•</span>
            <span>{article.readTime} min</span>
          </div>
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4 hidden sm:block">{article.excerpt}</p>
          <div className="flex items-center gap-2 pt-2 sm:pt-3 border-t border-gray-100">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] sm:text-xs font-semibold">{article.author.charAt(0)}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">{article.author}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
