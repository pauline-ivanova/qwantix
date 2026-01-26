import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllServiceSlugs } from '@/lib/services';
import { i18n } from '@/i18n.config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.qwantix.agency';

/**
 * Generate image sitemap for better image indexing in Google Images
 * Includes OG images, blog images, and service images
 */
export async function GET() {
  const imageUrls: Array<{
    loc: string;
    caption?: string;
    title?: string;
    geoLocation?: string;
    license?: string;
  }> = [];

  // Add OG image for homepage (each language)
  i18n.locales.forEach((lang) => {
    imageUrls.push({
      loc: `${baseUrl}/images/og-image.jpg`,
      caption: lang === 'es' 
        ? 'Qwantix Agency - Marketing Digital'
        : lang === 'de'
        ? 'Qwantix Agency - Digital Marketing'
        : lang === 'ru'
        ? 'Qwantix Agency - Цифровой маркетинг'
        : 'Qwantix Agency - Digital Marketing',
      title: 'Qwantix Agency',
    });
  });

  // Add blog post OG images
  i18n.locales.forEach((lang) => {
    const posts = getAllPosts(lang);
    posts.forEach((post) => {
      imageUrls.push({
        loc: `${baseUrl}/api/og/blog/${post.slug}?lang=${lang}`,
        caption: post.excerpt || post.title,
        title: post.title,
      });
    });
  });

  // Add service OG images
  const services = getAllServiceSlugs();
  services.forEach(({ params }) => {
    imageUrls.push({
      loc: `${baseUrl}/api/og/service/${params.slug}?lang=${params.lang}`,
      caption: `Service: ${params.slug}`,
      title: params.slug.replace(/-/g, ' '),
    });
  });

  // Generate XML
  const imageEntries = imageUrls.map((image) => {
    let imageXml = `    <image:image>
      <image:loc>${image.loc}</image:loc>`;
    
    if (image.caption) {
      imageXml += `\n      <image:caption><![CDATA[${image.caption}]]></image:caption>`;
    }
    
    if (image.title) {
      imageXml += `\n      <image:title><![CDATA[${image.title}]]></image:title>`;
    }
    
    if (image.geoLocation) {
      imageXml += `\n      <image:geo_location>${image.geoLocation}</image:geo_location>`;
    }
    
    if (image.license) {
      imageXml += `\n      <image:license>${image.license}</image:license>`;
    }
    
    imageXml += `\n    </image:image>`;
    return imageXml;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
${imageEntries.join('\n')}
  </url>
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
