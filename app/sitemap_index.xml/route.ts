import { NextResponse } from 'next/server';
import { generateSitemapIndex } from '@/lib/sitemap-utils';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';

export async function GET() {
  const sitemaps = [
    {
      loc: `${baseUrl}/sitemap-main.xml`,
      lastmod: new Date(),
    },
    {
      loc: `${baseUrl}/sitemap-services.xml`,
      lastmod: new Date(),
    },
    {
      loc: `${baseUrl}/sitemap-blog.xml`,
      lastmod: new Date(),
    },
    {
      loc: `${baseUrl}/sitemap-legal.xml`,
      lastmod: new Date(),
    },
  ];

  const xml = generateSitemapIndex(sitemaps);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
