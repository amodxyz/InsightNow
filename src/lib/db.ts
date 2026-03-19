const DB_FILE = process.env.DB_PATH || './data/db.json';

export interface DB {
  articles: Article[];
  categories: Category[];
  users: User[];
  ads: Ad[];
  comments: Comment[];
  settings: SiteSettings;
}

export interface Article {
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
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  articleCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
  avatar: string;
  bio: string;
  createdAt: string;
  lastLogin: string;
}

export interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  size: 'leaderboard' | 'medium-rectangle' | 'large-rectangle' | 'wide-skyscraper';
  status: 'active' | 'scheduled' | 'paused' | 'expired';
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  email: string;
  content: string;
  parentId: string | null;
  status: 'pending' | 'approved' | 'spam';
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  socialLinks: Record<string, string>;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
}

import { promises as fs } from 'fs';
import path from 'path';

async function ensureDataDir(): Promise<string> {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  return dataDir;
}

export async function getDB(): Promise<DB> {
  const dataDir = await ensureDataDir();
  const dbPath = path.join(dataDir, 'db.json');
  
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return getDefaultDB();
  }
}

export async function saveDB(db: DB): Promise<void> {
  const dataDir = await ensureDataDir();
  const dbPath = path.join(dataDir, 'db.json');
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

function getDefaultDB(): DB {
  return {
    articles: [],
    categories: [],
    users: [],
    ads: [],
    comments: [],
    settings: {
      siteName: 'InsightNow',
      siteDescription: 'Your trusted source for breaking news and in-depth analysis',
      logo: '/logo.png',
      socialLinks: {},
      seo: {
        defaultTitle: 'InsightNow | Breaking News',
        defaultDescription: 'Stay informed with the latest news',
        keywords: ['news', 'breaking news', 'headlines']
      }
    }
  };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function getArticles(): Promise<Article[]> {
  const db = await getDB();
  return db.articles;
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const db = await getDB();
  return db.articles.find(a => a.id === id);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const db = await getDB();
  return db.articles.find(a => a.slug === slug);
}

export async function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
  const db = await getDB();
  const newArticle: Article = {
    ...article,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.articles.push(newArticle);
  await saveDB(db);
  return newArticle;
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | undefined> {
  const db = await getDB();
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  
  db.articles[index] = {
    ...db.articles[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  await saveDB(db);
  return db.articles[index];
}

export async function deleteArticle(id: string): Promise<boolean> {
  const db = await getDB();
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  db.articles.splice(index, 1);
  await saveDB(db);
  return true;
}

export async function getCategories(): Promise<Category[]> {
  const db = await getDB();
  return db.categories;
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const db = await getDB();
  const newCategory: Category = {
    ...category,
    id: generateId()
  };
  db.categories.push(newCategory);
  await saveDB(db);
  return newCategory;
}

export async function getUsers(): Promise<User[]> {
  const db = await getDB();
  return db.users;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await getDB();
  return db.users.find(u => u.id === id);
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const db = await getDB();
  const newUser: User = {
    ...user,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  db.users.push(newUser);
  await saveDB(db);
  return newUser;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
  const db = await getDB();
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return undefined;
  
  db.users[index] = { ...db.users[index], ...updates };
  await saveDB(db);
  return db.users[index];
}

export async function deleteUser(id: string): Promise<boolean> {
  const db = await getDB();
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return false;
  
  db.users.splice(index, 1);
  await saveDB(db);
  return true;
}

export async function getAds(): Promise<Ad[]> {
  const db = await getDB();
  return db.ads;
}

export async function getActiveAds(position?: string): Promise<Ad[]> {
  const db = await getDB();
  const now = new Date().toISOString();
  
  return db.ads.filter(ad => {
    if (ad.status !== 'active') return false;
    if (position && ad.position !== position) return false;
    if (ad.startDate && ad.startDate > now) return false;
    if (ad.endDate && ad.endDate < now) return false;
    return true;
  });
}

export async function createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'clicks' | 'impressions'>): Promise<Ad> {
  const db = await getDB();
  const newAd: Ad = {
    ...ad,
    id: generateId(),
    createdAt: new Date().toISOString(),
    clicks: 0,
    impressions: 0
  };
  db.ads.push(newAd);
  await saveDB(db);
  return newAd;
}

export async function updateAd(id: string, updates: Partial<Ad>): Promise<Ad | undefined> {
  const db = await getDB();
  const index = db.ads.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  
  db.ads[index] = { ...db.ads[index], ...updates };
  await saveDB(db);
  return db.ads[index];
}

export async function deleteAd(id: string): Promise<boolean> {
  const db = await getDB();
  const index = db.ads.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  db.ads.splice(index, 1);
  await saveDB(db);
  return true;
}

export async function getComments(articleId?: string): Promise<Comment[]> {
  const db = await getDB();
  if (articleId) {
    return db.comments.filter(c => c.articleId === articleId && c.status === 'approved');
  }
  return db.comments.filter(c => c.status === 'approved');
}

export async function createComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  const db = await getDB();
  const newComment: Comment = {
    ...comment,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  db.comments.push(newComment);
  await saveDB(db);
  return newComment;
}

export async function getSettings(): Promise<SiteSettings> {
  const db = await getDB();
  return db.settings;
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDB();
  db.settings = { ...db.settings, ...settings };
  await saveDB(db);
  return db.settings;
}

export async function initializeDB(): Promise<DB> {
  const db = await getDB();
  
  if (db.categories.length === 0) {
    db.categories = [
      { id: '1', name: 'Technology', slug: 'technology', icon: '💻', description: 'Latest tech news and innovations', articleCount: 0 },
      { id: '2', name: 'Business', slug: 'business', icon: '📈', description: 'Business and market updates', articleCount: 0 },
      { id: '3', name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sports news and scores', articleCount: 0 },
      { id: '4', name: 'Entertainment', slug: 'entertainment', icon: '🎬', description: 'Movies, music, and celebrity news', articleCount: 0 },
      { id: '5', name: 'Health', slug: 'health', icon: '🏥', description: 'Health tips and medical news', articleCount: 0 },
      { id: '6', name: 'Science', slug: 'science', icon: '🔬', description: 'Scientific discoveries and research', articleCount: 0 },
    ];
  }
  
  if (db.users.length === 0) {
    db.users = [
      { id: '1', name: 'Admin User', email: 'admin@newshub.com', role: 'admin', avatar: '', bio: 'Site administrator', createdAt: new Date().toISOString(), lastLogin: '' },
      { id: '2', name: 'Sarah Johnson', email: 'sarah@newshub.com', role: 'editor', avatar: '', bio: 'Senior Editor', createdAt: new Date().toISOString(), lastLogin: '' },
      { id: '3', name: 'Mike Chen', email: 'mike@newshub.com', role: 'author', avatar: '', bio: 'Tech Writer', createdAt: new Date().toISOString(), lastLogin: '' },
    ];
  }
  
  await saveDB(db);
  return db;
}
