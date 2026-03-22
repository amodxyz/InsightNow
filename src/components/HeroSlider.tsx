'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface HeroSliderProps {
  articles: Article[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [articles.length, isPaused]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % articles.length);

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 translate-x-4 sm:translate-x-8'
          }`}
        >
          <Link href={`/article/${article.slug}/`} className="block h-full">
            <div className="relative h-full">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-16">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <span className="inline-flex items-center px-2 sm:px-3 sm:py-1 bg-primary-600 text-white text-[10px] sm:text-sm font-semibold rounded-full shadow-lg shadow-primary-500/50">
                      {article.category}
                    </span>
                    <span className="text-white/80 text-[10px] sm:text-sm hidden xs:inline">{article.readTime} min</span>
                  </div>
                  
                  <h2 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-extrabold text-white mb-2 sm:mb-4 leading-tight text-balance">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-200 text-xs sm:text-sm md:text-lg mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none max-w-xl hidden sm:block">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 sm:gap-4 text-gray-300 text-[10px] sm:text-sm">
                    <span className="font-medium text-white">{article.author}</span>
                    <span className="text-white/50 hidden sm:inline">|</span>
                    <time dateTime={article.publishedAt} className="hidden sm:inline">{formatDate(article.publishedAt)}</time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-110 hidden sm:flex"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-110 hidden sm:flex"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-6 sm:w-10 md:w-12 shadow-lg' 
                : 'bg-white/40 hover:bg-white/60 w-4 sm:w-6 md:w-8'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-3 sm:top-4 right-4 z-20 hidden sm:flex">
        <span className="px-2 sm:px-3 py-1 bg-black/30 backdrop-blur-md text-white text-xs font-medium rounded-full">
          {currentSlide + 1} / {articles.length}
        </span>
      </div>
    </div>
  );
}
