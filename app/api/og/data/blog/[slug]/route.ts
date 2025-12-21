import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';
import { sanitizeSlug, checkRateLimit, getClientIp } from '@/lib/security';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    // Rate limiting: 60 requests per minute per IP
    const ip = getClientIp(request);
    const { success, remaining } = checkRateLimit(ip, { limit: 60, windowMs: 60 * 1000 });
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' }, 
        { 
          status: 429,
          headers: { 'X-RateLimit-Limit': '60', 'X-RateLimit-Remaining': '0' }
        }
      );
    }

    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = sanitizeSlug(resolvedParams.slug);
    
    if (!slug) {
      return NextResponse.json({ error: 'Valid slug is required' }, { status: 400 });
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
        const response = NextResponse.json({
          slug,
          title: data.title,
          excerpt: data.excerpt || data.title,
          category: data.category || 'SEO',
          lang: 'en',
        });
        response.headers.set('X-RateLimit-Remaining', remaining.toString());
        return response;
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    const response = NextResponse.json({
      slug,
      title: data.title,
      excerpt: data.excerpt || data.title,
      category: data.category || 'SEO',
      lang,
    });
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    return response;
  } catch (e: any) {
    console.error('Error getting blog post data:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
