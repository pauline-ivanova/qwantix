import { NextRequest, NextResponse } from 'next/server';
import { getServiceData } from '@/lib/services';

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
    
    const serviceData = await getServiceData(lang, slug);
    
    if (!serviceData) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      slug,
      title: serviceData.frontmatter.title,
      description: serviceData.frontmatter.description,
      category: serviceData.frontmatter.category || 'SEO',
      lang,
    });
  } catch (e: any) {
    console.error('Error getting service data:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
