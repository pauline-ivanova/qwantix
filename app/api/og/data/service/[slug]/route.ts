import { NextRequest, NextResponse } from 'next/server';
import { getServiceData } from '@/lib/services';
import { checkRateLimit, getClientIp } from '@/lib/security';

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
    
    const response = NextResponse.json({
      slug,
      title: serviceData.frontmatter.title,
      description: serviceData.frontmatter.description,
      category: serviceData.frontmatter.category || 'SEO',
      lang,
    });
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    return response;
  } catch (e: any) {
    console.error('Error getting service data:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
