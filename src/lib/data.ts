import { Article, Category, Comment } from './db';

export type { Article, Category, Comment };

export const categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', icon: '💻', description: 'Latest tech news and innovations', articleCount: 2 },
  { id: '2', name: 'Business', slug: 'business', icon: '📈', description: 'Business and market updates', articleCount: 1 },
  { id: '3', name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sports news and scores', articleCount: 1 },
  { id: '4', name: 'Entertainment', slug: 'entertainment', icon: '🎬', description: 'Movies, music, and celebrity news', articleCount: 1 },
  { id: '5', name: 'Health', slug: 'health', icon: '🏥', description: 'Health tips and medical news', articleCount: 1 },
  { id: '6', name: 'Science', slug: 'science', icon: '🔬', description: 'Scientific discoveries and research', articleCount: 2 },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Breaking: Major Tech Companies Announce Revolutionary AI Partnership',
    slug: 'tech-companies-ai-partnership',
    excerpt: 'Leading technology giants have joined forces to create unprecedented advances in artificial intelligence research and development.',
    content: `<p>In a landmark announcement today, several of the world's largest technology companies revealed a groundbreaking partnership aimed at accelerating artificial intelligence research.</p>
    <h2>The Partnership Details</h2>
    <p>The collaboration brings together expertise from multiple sectors, pooling resources to tackle some of the most challenging problems in AI development.</p>
    <ul>
      <li>Shared research facilities across three continents</li>
      <li>Joint development of open-source AI tools</li>
      <li>Combined investment of $10 billion over five years</li>
      <li>Ethical AI framework development</li>
    </ul>
    <h2>Industry Impact</h2>
    <p>Analysts predict this partnership could reshape the competitive landscape of the AI industry, potentially accelerating timeline for breakthrough innovations.</p>`,
    category: 'Technology',
    categorySlug: 'technology',
    author: 'Sarah Johnson',
    authorId: '2',
    publishedAt: '2026-03-19',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['AI', 'Technology', 'Partnerships'],
    readTime: 5,
    featured: true,
    status: 'published',
    createdAt: '2026-03-19T10:00:00.000Z',
    updatedAt: '2026-03-19T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Global Markets Rally as Economic Indicators Show Strong Growth',
    slug: 'global-markets-rally',
    excerpt: 'Stock markets worldwide surge following positive economic data releases.',
    content: `<p>Financial markets across the globe experienced significant gains today as new economic data suggested stronger-than-expected growth.</p>
    <h2>Market Performance</h2>
    <p>Major indices posted impressive gains, with technology and financial sectors leading the charge.</p>
    <h2>Expert Analysis</h2>
    <p>Market analysts attribute the rally to a combination of strong corporate earnings and positive economic indicators.</p>`,
    category: 'Business',
    categorySlug: 'business',
    author: 'Mike Chen',
    authorId: '3',
    publishedAt: '2026-03-18',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['Markets', 'Economy', 'Business'],
    readTime: 4,
    featured: true,
    status: 'published',
    createdAt: '2026-03-18T09:00:00.000Z',
    updatedAt: '2026-03-18T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'Historic Championship Victory Breaks 50-Year Drought',
    slug: 'historic-championship-victory',
    excerpt: 'Team celebrates after winning their first championship in half a century.',
    content: `<p>In a thrilling finale that will be remembered for generations, the team secured their first championship title in 50 years.</p>
    <h2>The Journey</h2>
    <p>Years of dedication, strategic acquisitions, and relentless training culminated in this historic moment.</p>
    <h2>Celebrations</h2>
    <p>Fans flooded the streets in celebration as the winning moment was broadcast nationwide.</p>`,
    category: 'Sports',
    categorySlug: 'sports',
    author: 'Sarah Johnson',
    authorId: '2',
    publishedAt: '2026-03-17',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop',
    tags: ['Sports', 'Championship', 'Victory'],
    readTime: 6,
    featured: false,
    status: 'published',
    createdAt: '2026-03-17T14:00:00.000Z',
    updatedAt: '2026-03-17T14:00:00.000Z',
  },
  {
    id: '4',
    title: 'New Blockbuster Movie Breaks Opening Weekend Records',
    slug: 'blockbuster-opening-weekend',
    excerpt: 'Highly anticipated film exceeds all box office expectations.',
    content: `<p>The newest addition to the blockbuster franchise has shattered opening weekend records worldwide.</p>
    <h2>Box Office Success</h2>
    <p>With unprecedented marketing and critical acclaim, the film has become a cultural phenomenon.</p>`,
    category: 'Entertainment',
    categorySlug: 'entertainment',
    author: 'Mike Chen',
    authorId: '3',
    publishedAt: '2026-03-16',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    tags: ['Movies', 'Entertainment', 'Box Office'],
    readTime: 3,
    featured: false,
    status: 'published',
    createdAt: '2026-03-16T11:00:00.000Z',
    updatedAt: '2026-03-16T11:00:00.000Z',
  },
  {
    id: '5',
    title: 'Revolutionary Treatment Shows Promise for Common Disease',
    slug: 'revolutionary-treatment',
    excerpt: 'Medical breakthrough offers new hope for millions of patients.',
    content: `<p>Researchers have announced a groundbreaking treatment that could transform how we approach this prevalent condition.</p>
    <h2>Clinical Trials</h2>
    <p>The treatment has shown remarkable results in phase III trials with minimal side effects.</p>`,
    category: 'Health',
    categorySlug: 'health',
    author: 'Sarah Johnson',
    authorId: '2',
    publishedAt: '2026-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
    tags: ['Health', 'Medical', 'Research'],
    readTime: 5,
    featured: false,
    status: 'published',
    createdAt: '2026-03-15T08:00:00.000Z',
    updatedAt: '2026-03-15T08:00:00.000Z',
  },
  {
    id: '6',
    title: 'Scientists Discover New Species in Deep Ocean Exploration',
    slug: 'new-species-discovery',
    excerpt: 'Deep sea expedition reveals previously unknown marine life.',
    content: `<p>A team of marine biologists has discovered several new species during their latest deep ocean exploration mission.</p>
    <h2>The Discovery</h2>
    <p>Using advanced submersible technology, the team documented life forms never before seen by humans.</p>`,
    category: 'Science',
    categorySlug: 'science',
    author: 'Mike Chen',
    authorId: '3',
    publishedAt: '2026-03-14',
    imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=400&fit=crop',
    tags: ['Science', 'Ocean', 'Discovery'],
    readTime: 4,
    featured: false,
    status: 'published',
    createdAt: '2026-03-14T12:00:00.000Z',
    updatedAt: '2026-03-14T12:00:00.000Z',
  },
  {
    id: '7',
    title: 'Space Agency Announces Plans for Mars Colony',
    slug: 'mars-colony-plans',
    excerpt: 'Ambitious timeline set for establishing permanent human presence on Mars.',
    content: `<p>The space agency has unveiled detailed plans for establishing the first permanent human colony on Mars.</p>
    <h2>Timeline and Goals</h2>
    <p>The multi-phase project aims to have the first settlers arrive within the next decade.</p>`,
    category: 'Science',
    categorySlug: 'science',
    author: 'Sarah Johnson',
    authorId: '2',
    publishedAt: '2026-03-13',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=400&fit=crop',
    tags: ['Space', 'Mars', 'Technology'],
    readTime: 7,
    featured: true,
    status: 'published',
    createdAt: '2026-03-13T10:00:00.000Z',
    updatedAt: '2026-03-13T10:00:00.000Z',
  },
  {
    id: '8',
    title: 'Tech Giant Unveils Next-Generation Smartphone',
    slug: 'next-gen-smartphone',
    excerpt: 'Revolutionary features set to redefine mobile computing.',
    content: `<p>The latest flagship smartphone promises to deliver unprecedented performance and innovative features.</p>
    <h2>Key Features</h2>
    <p>Advanced AI integration, enhanced camera systems, and extended battery life headline the improvements.</p>`,
    category: 'Technology',
    categorySlug: 'technology',
    author: 'Mike Chen',
    authorId: '3',
    publishedAt: '2026-03-12',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=400&fit=crop',
    tags: ['Technology', 'Smartphone', 'Gadgets'],
    readTime: 4,
    featured: false,
    status: 'published',
    createdAt: '2026-03-12T09:00:00.000Z',
    updatedAt: '2026-03-12T09:00:00.000Z',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return articles
    .filter(a => a.id !== article.id && (a.categorySlug === article.categorySlug || a.tags.some(t => article.tags.includes(t))))
    .slice(0, limit);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter(a => a.categorySlug === categorySlug);
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(a =>
    a.title.toLowerCase().includes(lowerQuery) ||
    a.excerpt.toLowerCase().includes(lowerQuery) ||
    a.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const sampleComments = [
  {
    id: '1',
    articleId: '1',
    author: 'John Doe',
    avatar: '',
    date: '2026-03-19',
    content: 'This is fantastic news! The partnership could really accelerate AI development and benefit everyone.',
    likes: 12,
    replies: [
      {
        id: '2',
        author: 'Jane Smith',
        avatar: '',
        date: '2026-03-19',
        content: 'I completely agree! It will be interesting to see how they collaborate.',
        likes: 5,
      },
    ],
  },
  {
    id: '3',
    articleId: '1',
    author: 'Alex Wilson',
    avatar: '',
    date: '2026-03-18',
    content: 'I hope they focus on ethical AI development and safety measures.',
    likes: 8,
    replies: [],
  },
];
