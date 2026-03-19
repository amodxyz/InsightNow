import Link from 'next/link';
import EditArticleForm from './EditArticleForm';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/admin/articles/" className="hover:text-primary-600">Articles</Link>
          <span>/</span>
          <span>Edit Article</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Article</h1>
      </div>
      <EditArticleForm />
    </div>
  );
}
