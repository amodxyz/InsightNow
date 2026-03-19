import { Article, Category, User, Ad, Comment, SiteSettings } from './db';

export type { Article, Category, User, Ad, Comment, SiteSettings };

const STORAGE_KEY = 'insightnow_data';

export interface StorageData {
  articles: Article[];
  categories: Category[];
  users: User[];
  ads: Ad[];
  comments: Comment[];
  settings: SiteSettings;
}

const defaultData: StorageData = {
  articles: [],
  categories: [],
  users: [],
  ads: [],
  comments: [],
  settings: {
    siteName: 'InsightNow',
    siteDescription: 'Your trusted source for breaking news',
    logo: '/logo.png',
    socialLinks: {},
    seo: {
      defaultTitle: 'InsightNow | Breaking News',
      defaultDescription: 'Stay informed with the latest breaking news',
      keywords: ['news', 'breaking news', 'headlines']
    }
  }
};

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function getStorageData(): StorageData {
  if (typeof window === 'undefined') return defaultData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    initializeStorage();
    return defaultData;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultData;
  }
}

export function saveStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function initializeStorage(): void {
  const data = getStorageData();
  
  if (data.categories.length === 0) {
    data.categories = [
      { id: generateId(), name: 'Technology', slug: 'technology', icon: '💻', description: 'Latest tech news', articleCount: 0 },
      { id: generateId(), name: 'Business', slug: 'business', icon: '📈', description: 'Business news', articleCount: 0 },
      { id: generateId(), name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sports news', articleCount: 0 },
      { id: generateId(), name: 'Entertainment', slug: 'entertainment', icon: '🎬', description: 'Entertainment news', articleCount: 0 },
      { id: generateId(), name: 'Health', slug: 'health', icon: '🏥', description: 'Health news', articleCount: 0 },
      { id: generateId(), name: 'Science', slug: 'science', icon: '🔬', description: 'Science news', articleCount: 0 },
    ];
  }
  
  if (data.users.length === 0) {
    data.users = [
      { id: '1', name: 'Admin User', email: 'admin@insightnow.com', role: 'admin', avatar: '', bio: 'Administrator', createdAt: new Date().toISOString(), lastLogin: '' },
    ];
  }
  
  saveStorageData(data);
}

export function getArticles(): Article[] {
  return getStorageData().articles;
}

export function getArticleById(id: string): Article | undefined {
  return getArticles().find(a => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find(a => a.slug === slug);
}

export function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Article {
  const data = getStorageData();
  const newArticle: Article = {
    ...article,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.articles.push(newArticle);
  
  const category = data.categories.find(c => c.slug === article.categorySlug);
  if (category) {
    category.articleCount++;
  }
  
  saveStorageData(data);
  return newArticle;
}

export function updateArticle(id: string, updates: Partial<Article>): Article | undefined {
  const data = getStorageData();
  const index = data.articles.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  
  data.articles[index] = {
    ...data.articles[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveStorageData(data);
  return data.articles[index];
}

export function deleteArticle(id: string): boolean {
  const data = getStorageData();
  const index = data.articles.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  const article = data.articles[index];
  const category = data.categories.find(c => c.slug === article.categorySlug);
  if (category) {
    category.articleCount = Math.max(0, category.articleCount - 1);
  }
  
  data.articles.splice(index, 1);
  saveStorageData(data);
  return true;
}

export function getCategories(): Category[] {
  return getStorageData().categories;
}

export function createCategory(category: Omit<Category, 'id'>): Category {
  const data = getStorageData();
  const newCategory: Category = {
    ...category,
    id: generateId()
  };
  data.categories.push(newCategory);
  saveStorageData(data);
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | undefined {
  const data = getStorageData();
  const index = data.categories.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  
  data.categories[index] = { ...data.categories[index], ...updates };
  saveStorageData(data);
  return data.categories[index];
}

export function deleteCategory(id: string): boolean {
  const data = getStorageData();
  const index = data.categories.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  data.categories.splice(index, 1);
  saveStorageData(data);
  return true;
}

export function getUsers(): User[] {
  return getStorageData().users;
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const data = getStorageData();
  const newUser: User = {
    ...user,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  data.users.push(newUser);
  saveStorageData(data);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const data = getStorageData();
  const index = data.users.findIndex(u => u.id === id);
  if (index === -1) return undefined;
  
  data.users[index] = { ...data.users[index], ...updates };
  saveStorageData(data);
  return data.users[index];
}

export function deleteUser(id: string): boolean {
  const data = getStorageData();
  const index = data.users.findIndex(u => u.id === id);
  if (index === -1) return false;
  
  data.users.splice(index, 1);
  saveStorageData(data);
  return true;
}

export function getAds(): Ad[] {
  return getStorageData().ads;
}

export function createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'clicks' | 'impressions'>): Ad {
  const data = getStorageData();
  const newAd: Ad = {
    ...ad,
    id: generateId(),
    createdAt: new Date().toISOString(),
    clicks: 0,
    impressions: 0
  };
  data.ads.push(newAd);
  saveStorageData(data);
  return newAd;
}

export function updateAd(id: string, updates: Partial<Ad>): Ad | undefined {
  const data = getStorageData();
  const index = data.ads.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  
  data.ads[index] = { ...data.ads[index], ...updates };
  saveStorageData(data);
  return data.ads[index];
}

export function deleteAd(id: string): boolean {
  const data = getStorageData();
  const index = data.ads.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  data.ads.splice(index, 1);
  saveStorageData(data);
  return true;
}

export function getComments(articleId?: string): Comment[] {
  const data = getStorageData();
  if (articleId) {
    return data.comments.filter(c => c.articleId === articleId);
  }
  return data.comments;
}

export function createComment(comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
  const data = getStorageData();
  const newComment: Comment = {
    ...comment,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  data.comments.push(newComment);
  saveStorageData(data);
  return newComment;
}

export function getSettings(): SiteSettings {
  return getStorageData().settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const data = getStorageData();
  data.settings = { ...data.settings, ...settings };
  saveStorageData(data);
  return data.settings;
}
