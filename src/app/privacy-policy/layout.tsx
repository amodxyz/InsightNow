import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for InsightNow - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
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
