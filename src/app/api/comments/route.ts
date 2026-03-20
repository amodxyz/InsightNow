import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { articleSlug, author, content } = await request.json();
    
    if (!author || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = {
      id: Date.now().toString(),
      articleSlug,
      author,
      content,
      createdAt: new Date().toISOString(),
    };

    console.log('New comment:', comment);
    
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  return NextResponse.json({ 
    comments: [
      { id: '1', author: 'John Doe', content: 'Great article!', createdAt: new Date().toISOString() }
    ] 
  });
}
