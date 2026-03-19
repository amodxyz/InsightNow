import { 
  getArticles as fsGetArticles,
  getArticleBySlug as fsGetArticleBySlug,
  createArticle as fsCreateArticle,
  updateArticle as fsUpdateArticle,
  deleteArticle as fsDeleteArticle,
  getCategories as fsGetCategories,
  createCategory as fsCreateCategory,
  updateCategory as fsUpdateCategory,
  deleteCategory as fsDeleteCategory,
  getUsers as fsGetUsers,
  getUserById as fsGetUserById,
  createUser as fsCreateUser,
  updateUser as fsUpdateUser,
  deleteUser as fsDeleteUser,
  getAds as fsGetAds,
  createAd as fsCreateAd,
  updateAd as fsUpdateAd,
  deleteAd as fsDeleteAd,
  getComments as fsGetComments,
  createComment as fsCreateComment,
  Article, Category, User, Ad, Comment
} from './firestore';

export type { Article, Category, User, Ad, Comment };

export function initializeFirestore(): void {
  console.log('Firestore initialized');
}

export async function getArticles(): Promise<Article[]> {
  return fsGetArticles();
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const result = await fsGetArticleBySlug(slug);
  return result || undefined;
}

export async function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
  return fsCreateArticle({
    ...article,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | undefined> {
  await fsUpdateArticle(id, updates);
  return { id, ...updates } as Article;
}

export async function deleteArticle(id: string): Promise<boolean> {
  await fsDeleteArticle(id);
  return true;
}

export async function getCategories(): Promise<Category[]> {
  return fsGetCategories();
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  return fsCreateCategory(category);
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category | undefined> {
  await fsUpdateCategory(id, updates);
  return { id, ...updates } as Category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  await fsDeleteCategory(id);
  return true;
}

export async function getUsers(): Promise<User[]> {
  return fsGetUsers();
}

export async function getUserById(id: string): Promise<User | undefined> {
  const result = await fsGetUserById(id);
  return result || undefined;
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  return fsCreateUser({
    ...user,
    createdAt: new Date().toISOString(),
  });
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
  await fsUpdateUser(id, updates);
  return { id, ...updates } as User;
}

export async function deleteUser(id: string): Promise<boolean> {
  await fsDeleteUser(id);
  return true;
}

export async function getAds(): Promise<Ad[]> {
  return fsGetAds();
}

export async function createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'clicks' | 'impressions'>): Promise<Ad> {
  return fsCreateAd({
    ...ad,
    createdAt: new Date().toISOString(),
    clicks: 0,
    impressions: 0,
  });
}

export async function updateAd(id: string, updates: Partial<Ad>): Promise<Ad | undefined> {
  await fsUpdateAd(id, updates);
  return { id, ...updates } as Ad;
}

export async function deleteAd(id: string): Promise<boolean> {
  await fsDeleteAd(id);
  return true;
}

export async function getComments(articleId?: string): Promise<Comment[]> {
  return fsGetComments(articleId);
}

export async function createComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  return fsCreateComment({
    ...comment,
    createdAt: new Date().toISOString(),
  });
}

export async function getSettings(): Promise<{ siteName: string }> {
  return { siteName: 'InsightNow' };
}

export async function updateSettings(): Promise<void> {
  console.log('Settings updated');
}

export { initializeFirestore as initializeStorage };
