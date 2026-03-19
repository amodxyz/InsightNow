import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  article?: {
    publishedTime: string;
    author: string;
    tags: string[];
  };
}

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage = '/og-image.jpg',
  article,
}: SEOProps): Metadata {
  const siteName = 'InsightNow';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL('https://yournewssite.com'),
    alternates: {
      canonical: canonical || '/',
    },
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: article ? 'article' : 'website',
      ...(article && {
        publishedTime: article.publishedTime,
        authors: [article.author],
        tags: article.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:published_time': article?.publishedTime || '',
      'article:author': article?.author || '',
    },
  };
}
