import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    
    // Try to get language from query params or default to 'en'
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'en';
    
    const postsDirectory = path.join(process.cwd(), 'content', 'blog');
    const langDirectory = path.join(postsDirectory, lang);
    const filePath = path.join(langDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      // Try English as fallback
      const enPath = path.join(postsDirectory, 'en', `${slug}.mdx`);
      if (fs.existsSync(enPath)) {
        const fileContents = fs.readFileSync(enPath, 'utf8');
        const { data } = matter(fileContents);
        return NextResponse.json({
          slug,
          title: data.title,
          excerpt: data.excerpt || data.title,
          category: data.category || 'SEO',
          lang: 'en',
        });
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return NextResponse.json({
      slug,
      title: data.title,
      excerpt: data.excerpt || data.title,
      category: data.category || 'SEO',
      lang,
    });
  } catch (e: any) {
    console.error('Error getting blog post data:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
