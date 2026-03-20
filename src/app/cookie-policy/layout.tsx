import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for InsightNow - Learn about how we use cookies and similar technologies.',
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header categories={categories} />
      <main className="min-h-screen bg-gray-50 flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
