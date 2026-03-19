'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
  avatar: string;
  bio: string;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('insightnow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('insightnow_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return false;
      }

      const userDoc = snapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() } as User;

      if (password.length >= 4) {
        const userWithLogin = { ...userData, lastLogin: new Date().toISOString() };
        setUser(userWithLogin);
        localStorage.setItem('insightnow_user', JSON.stringify(userWithLogin));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('insightnow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
