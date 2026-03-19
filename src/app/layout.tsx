import type { Metadata, Viewport } from 'next';
import './globals.css';
import HeadlineTicker from '@/components/HeadlineTicker';

export const metadata: Metadata = {
  metadataBase: new URL('https://yournewssite.com'),
  title: {
    default: 'InsightNow | Breaking News, Latest Headlines & In-Depth Analysis',
    template: '%s | InsightNow',
  },
  description: 'Stay informed with InsightNow - Your trusted source for breaking news, latest headlines, in-depth analysis, and comprehensive coverage across technology, business, sports, entertainment, health, and science.',
  keywords: [
    'news',
    'breaking news',
    'latest news',
    'headlines',
    'today news',
    'current events',
    'technology news',
    'business news',
    'sports news',
    'entertainment news',
    'health news',
    'science news',
    'world news',
    'national news',
    'local news',
    'politics',
    'economy',
    'AI news',
    'stock market',
    'tech trends',
  ],
  authors: [{ name: 'InsightNow Editorial Team', url: 'https://yournewssite.com/about' }],
  creator: 'InsightNow',
  publisher: 'InsightNow Media',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yournewssite.com',
    siteName: 'InsightNow',
    title: 'InsightNow | Breaking News, Latest Headlines & In-Depth Analysis',
    description: 'Stay informed with InsightNow - Your trusted source for breaking news, latest headlines, in-depth analysis, and comprehensive coverage.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InsightNow - Breaking News & Latest Headlines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsightNow | Breaking News & Latest Headlines',
    description: 'Stay informed with InsightNow - Your trusted source for breaking news and in-depth analysis.',
    site: '@insightnow',
    creator: '@insightnow',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://yournewssite.com',
    languages: {
      'en-US': 'https://yournewssite.com',
    },
  },
  category: 'news',
  classification: 'News/Media',
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8725656527291179" crossOrigin="anonymous"></script>
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <HeadlineTicker />
        {children}
      </body>
    </html>
  );
}
