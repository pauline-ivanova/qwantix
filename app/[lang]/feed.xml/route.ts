import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { i18n } from '@/i18n.config';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.qwantix.agency';

// Fixed date for all metadata: December 21, 2025
const FIXED_DATE = new Date('2025-12-21T12:00:00Z');

/**
 * Generate RSS feed for blog posts
 * Supports all languages with separate feeds
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> | { lang: string } }
) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang || 'en';
  
  if (!i18n.locales.includes(lang as any)) {
    return new NextResponse('Language not found', { status: 404 });
  }

  const posts = getAllPosts(lang);
  const postsDirectory = path.join(process.cwd(), 'content', 'blog', lang);

  // Get full post data with content
  const postsWithContent = posts
    .map((post) => {
      const filePath = path.join(postsDirectory, `${post.slug}.mdx`);
      if (!fs.existsSync(filePath)) return null;

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = fs.statSync(filePath);

      return {
        ...post,
        content: content.substring(0, 500), // First 500 chars for description
        lastModified: FIXED_DATE,
        date: FIXED_DATE,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Since all dates are the same, we can sort by title or just keep the order
      return (a!.title || '').localeCompare(b!.title || '');
    })
    .slice(0, 20); // Latest 20 posts

  const siteName = lang === 'es' 
    ? 'Qwantix Agency - Marketing Digital'
    : lang === 'de'
    ? 'Qwantix Agency - Digital Marketing'
    : lang === 'ru'
    ? 'Qwantix Agency - Цифровой маркетинг'
    : 'Qwantix Agency - Digital Marketing';

  const siteDescription = lang === 'es'
    ? 'Marketing digital impulsado por analítica. SEO, PPC y contenido para maximizar tu ROI.'
    : lang === 'de'
    ? 'Digital Marketing, datengetrieben. SEO, PPC & Content für maximalen ROI.'
    : lang === 'ru'
    ? 'Цифровой маркетинг на основе аналитики. SEO, PPC и контент для максимального ROI.'
    : 'Digital Marketing Powered by Analytics. SEO, PPC & content strategies to maximize your ROI.';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName}</title>
    <link>${baseUrl}/${lang}</link>
    <description>${siteDescription}</description>
    <language>${lang}</language>
    <lastBuildDate>${FIXED_DATE.toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/${lang}/feed.xml" rel="self" type="application/rss+xml"/>
    ${postsWithContent
      .map((post) => {
        const postUrl = `${baseUrl}/${lang}/blog/${post!.slug}`;
        const pubDate = FIXED_DATE.toUTCString();
        const description = post!.excerpt || post!.content.replace(/<[^>]*>/g, '').substring(0, 200);

        return `
    <item>
      <title><![CDATA[${post!.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post!.category || 'Digital Marketing'}]]></category>
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
