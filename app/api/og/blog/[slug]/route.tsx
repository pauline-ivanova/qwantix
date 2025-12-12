import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

// Use edge runtime for @vercel/og
export const runtime = 'edge';

// Color mapping for categories (Qwantix services)
const categoryColors: { [key: string]: { bg: string; text: string; accent: string } } = {
  'SEO': { bg: '#4f46e5', text: '#ffffff', accent: '#4338ca' },
  'PPC': { bg: '#db2777', text: '#ffffff', accent: '#be185d' },
  'Social Media Marketing': { bg: '#ea580c', text: '#ffffff', accent: '#c2410c' },
  'SMM': { bg: '#ea580c', text: '#ffffff', accent: '#c2410c' },
  'Content Creation': { bg: '#0891b2', text: '#ffffff', accent: '#0e7490' },
  'Content': { bg: '#0891b2', text: '#ffffff', accent: '#0e7490' },
  'default': { bg: '#635bff', text: '#ffffff', accent: '#4f46e5' },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    // Handle params - in Next.js 14, params can be a Promise
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug;
    
    if (!slug) {
      return new Response('Slug is required', { status: 400 });
    }
    
    // Get language from query params
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'en';
    
    // Fetch blog post data from internal API (nodejs runtime)
    const origin = request.nextUrl.origin;
    const dataUrl = `${origin}/api/og/data/blog/${slug}?lang=${lang}`;
    
    const dataResponse = await fetch(dataUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'og-image-generator',
      },
    });
    
    if (!dataResponse.ok) {
      throw new Error(`Failed to fetch blog post data: ${dataResponse.statusText}`);
    }
    
    const post = await dataResponse.json();
    
    if (!post || post.error) {
      return new Response('Post not found', { status: 404 });
    }

    const category = post.category || 'SEO';
    const colors = categoryColors[category] || categoryColors.default;
    
    const title = post.title || 'Blog Post';
    const excerpt = post.excerpt || '';
    
    // Truncate title if too long (allow more characters for multi-line)
    const displayTitle = title.length > 80 ? title.substring(0, 77) + '...' : title;
    
    // Don't truncate excerpt - let it wrap naturally
    const displayExcerpt = excerpt;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.accent} 100%)`,
            position: 'relative',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
            }}
          />

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 100px 70px 100px',
              width: '100%',
              maxWidth: '1200px',
            }}
          >
            {/* Category badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                backdropFilter: 'blur(10px)',
              }}
            >
              {category}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '44px',
                fontWeight: 800,
                lineHeight: '1.2',
                textAlign: 'center',
                color: '#ffffff',
                marginBottom: '12px',
                maxWidth: '900px',
                wordWrap: 'break-word',
              }}
            >
              {displayTitle}
            </h1>

            {/* Excerpt */}
            {displayExcerpt && (
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.4',
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.95)',
                  maxWidth: '800px',
                  marginTop: '0',
                  marginBottom: '0',
                  wordWrap: 'break-word',
                }}
              >
                {displayExcerpt}
              </p>
            )}

            {/* Site name */}
            <div
              style={{
                position: 'absolute',
                bottom: '30px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              qwantix.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    ) as Response;
  } catch (e: any) {
    console.error('Error generating OG image:', e);
    console.error('Error stack:', e?.stack);
    // Return a fallback image on error
    try {
      return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #635bff 0%, #4f46e5 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
            }}
          >
            qwantix.com
          </h1>
        </div>
      ),
      { width: 1200, height: 630 }
    );
    } catch (fallbackError) {
      console.error('Error generating fallback image:', fallbackError);
      return new Response('Failed to generate image', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}
