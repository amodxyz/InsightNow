import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for InsightNow - Read our terms and conditions for using our website.',
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
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
