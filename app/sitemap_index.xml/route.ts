import { NextResponse } from 'next/server';
import { generateSitemapIndex } from '@/lib/sitemap-utils';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
const FIXED_DATE = new Date('2025-12-21T12:00:00Z');

export async function GET() {
  const sitemaps = [
    {
      loc: `${baseUrl}/sitemap-main.xml`,
      lastmod: FIXED_DATE,
    },
    {
      loc: `${baseUrl}/sitemap-services.xml`,
      lastmod: FIXED_DATE,
    },
    {
      loc: `${baseUrl}/sitemap-blog.xml`,
      lastmod: FIXED_DATE,
    },
    {
      loc: `${baseUrl}/sitemap-legal.xml`,
      lastmod: FIXED_DATE,
    },
    {
      loc: `${baseUrl}/sitemap-images.xml`,
      lastmod: FIXED_DATE,
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
