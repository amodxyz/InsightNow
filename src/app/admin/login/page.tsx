'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { db } = await import('@/lib/firebase');
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        setError('User not found. Please run /setup first.');
        setIsLoading(false);
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() };

      if (password.length >= 4) {
        const userWithLogin = { ...userData, lastLogin: new Date().toISOString() };
        localStorage.setItem('insightnow_user', JSON.stringify(userWithLogin));
        router.push('/admin/');
      } else {
        setError('Password must be at least 4 characters');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError('Database connection error. Please check Firebase setup.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">InsightNow Admin</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
                {error.includes('setup') && (
                  <div className="mt-2">
                    <Link href="/setup" className="underline font-medium">
                      Go to Setup Page
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="admin@insightnow.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
            <p>Demo credentials:</p>
            <p className="font-mono text-xs">admin@insightnow.com / password</p>
            <p className="text-xs">First time? <Link href="/setup" className="text-primary-600 hover:underline">Run Setup</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
