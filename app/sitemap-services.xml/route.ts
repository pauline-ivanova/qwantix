import { NextResponse } from 'next/server';
import { getServiceUrls, generateSitemapXml } from '@/lib/sitemap-utils';

export async function GET() {
  const urls = getServiceUrls();
  const xml = generateSitemapXml(urls);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
