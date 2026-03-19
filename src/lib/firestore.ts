import { db } from './firebase';
import { 
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy 
} from 'firebase/firestore';

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
  status: 'active' | 'paused' | 'scheduled' | 'expired';
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

// Articles
export async function getArticles(): Promise<Article[]> {
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
}

export async function getArticleById(id: string): Promise<Article | null> {
  const docRef = doc(db, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Article;
  }
  return null;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Article;
  }
  return null;
}

export async function createArticle(article: Omit<Article, 'id'>): Promise<Article> {
  const articlesRef = collection(db, 'articles');
  const docRef = await addDoc(articlesRef, article);
  return { id: docRef.id, ...article } as Article;
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<void> {
  const docRef = doc(db, 'articles', id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
}

export async function deleteArticle(id: string): Promise<void> {
  const docRef = doc(db, 'articles', id);
  await deleteDoc(docRef);
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const categoriesRef = collection(db, 'categories');
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const categoriesRef = collection(db, 'categories');
  const docRef = await addDoc(categoriesRef, category);
  return { id: docRef.id, ...category } as Category;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, updates);
}

export async function deleteCategory(id: string): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await deleteDoc(docRef);
}

// Users
export async function getUsers(): Promise<User[]> {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
}

export async function getUserById(id: string): Promise<User | null> {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const usersRef = collection(db, 'users');
  const docRef = await addDoc(usersRef, user);
  return { id: docRef.id, ...user } as User;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, updates);
}

export async function deleteUser(id: string): Promise<void> {
  const docRef = doc(db, 'users', id);
  await deleteDoc(docRef);
}

// Ads
export async function getAds(): Promise<Ad[]> {
  const adsRef = collection(db, 'ads');
  const snapshot = await getDocs(adsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
}

export async function createAd(ad: Omit<Ad, 'id'>): Promise<Ad> {
  const adsRef = collection(db, 'ads');
  const docRef = await addDoc(adsRef, ad);
  return { id: docRef.id, ...ad } as Ad;
}

export async function updateAd(id: string, updates: Partial<Ad>): Promise<void> {
  const docRef = doc(db, 'ads', id);
  await updateDoc(docRef, updates);
}

export async function deleteAd(id: string): Promise<void> {
  const docRef = doc(db, 'ads', id);
  await deleteDoc(docRef);
}

// Comments
export async function getComments(articleId?: string): Promise<Comment[]> {
  const commentsRef = collection(db, 'comments');
  let q;
  if (articleId) {
    q = query(commentsRef, where('articleId', '==', articleId), where('status', '==', 'approved'), orderBy('createdAt', 'desc'));
  } else {
    q = query(commentsRef, where('status', '==', 'approved'), orderBy('createdAt', 'desc'));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
}

export async function createComment(comment: Omit<Comment, 'id'>): Promise<Comment> {
  const commentsRef = collection(db, 'comments');
  const docRef = await addDoc(commentsRef, comment);
  return { id: docRef.id, ...comment } as Comment;
}
