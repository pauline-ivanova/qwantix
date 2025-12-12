/**
 * Utility functions for generating sitemap URLs
 */

import { i18n } from '@/i18n.config';
import { getAllServiceSlugs } from '@/lib/services';
import { getAllPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';

export interface SitemapUrl {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

/**
 * Get file modification time
 */
function getFileModTime(filePath: string): Date | null {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return null;
  }
}

/**
 * Generate URLs for main pages (home pages for each language)
 */
export function getMainPageUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  i18n.locales.forEach((lang) => {
    const alternates: Record<string, string> = {};
    i18n.locales.forEach((altLang) => {
      alternates[altLang] = `${baseUrl}/${altLang}`;
    });

    urls.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: alternates,
      },
    });
  });

  return urls;
}

/**
 * Generate URLs for all service pages
 */
export function getServiceUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const paths = getAllServiceSlugs();
  const servicesDirectory = path.join(process.cwd(), 'content', 'services');

  // Group by slug to get all languages for each service
  const servicesBySlug = new Map<string, { lang: string; slug: string }[]>();
  
  paths.forEach(({ params }) => {
    const { slug } = params;
    if (!servicesBySlug.has(slug)) {
      servicesBySlug.set(slug, []);
    }
    servicesBySlug.get(slug)!.push(params);
  });

  servicesBySlug.forEach((langs, slug) => {
    // Get all languages for this service
    const serviceLangs = langs.map((l) => l.lang);
    
    serviceLangs.forEach((lang) => {
      const filePath = path.join(servicesDirectory, lang, `${slug}.mdx`);
      const lastModified = getFileModTime(filePath);

      const alternates: Record<string, string> = {};
      serviceLangs.forEach((altLang) => {
        alternates[altLang] = `${baseUrl}/${altLang}/services/${slug}`;
      });

      urls.push({
        url: `${baseUrl}/${lang}/services/${slug}`,
        lastModified: lastModified || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return urls;
}

/**
 * Generate URLs for all blog posts
 */
export function getBlogUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');

  // Get all blog posts by language
  const postsBySlug = new Map<string, { lang: string; slug: string }[]>();

  i18n.locales.forEach((lang) => {
    const posts = getAllPosts(lang);
    posts.forEach((post) => {
      const slug = post.slug;
      if (!postsBySlug.has(slug)) {
        postsBySlug.set(slug, []);
      }
      postsBySlug.get(slug)!.push({ lang, slug });
    });
  });

  postsBySlug.forEach((langs, slug) => {
    langs.forEach(({ lang }) => {
      const filePath = path.join(postsDirectory, lang, `${slug}.mdx`);
      const lastModified = getFileModTime(filePath);

      const alternates: Record<string, string> = {};
      langs.forEach(({ lang: altLang }) => {
        alternates[altLang] = `${baseUrl}/${altLang}/blog/${slug}`;
      });

      urls.push({
        url: `${baseUrl}/${lang}/blog/${slug}`,
        lastModified: lastModified || new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return urls;
}

/**
 * Generate URLs for legal pages (privacy, cookies)
 */
export function getLegalUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const legalPages = ['privacy', 'cookies'];

  legalPages.forEach((page) => {
    const alternates: Record<string, string> = {};
    i18n.locales.forEach((lang) => {
      alternates[lang] = `${baseUrl}/${lang}/${page}`;
    });

    i18n.locales.forEach((lang) => {
      urls.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return urls;
}

/**
 * Format date for XML sitemap
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return new Date().toISOString();
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls.map((url) => {
    const lastmod = url.lastModified ? `    <lastmod>${formatDate(url.lastModified)}</lastmod>` : '';
    const changefreq = url.changeFrequency ? `    <changefreq>${url.changeFrequency}</changefreq>` : '';
    const priority = url.priority !== undefined ? `    <priority>${url.priority}</priority>` : '';
    
    let alternatesXml = '';
    if (url.alternates?.languages) {
      const hreflangEntries = Object.entries(url.alternates.languages)
        .map(([lang, href]) => `      <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`)
        .join('\n');
      if (hreflangEntries) {
        alternatesXml = `\n${hreflangEntries}`;
      }
    }

    return `  <url>
    <loc>${url.url}</loc>${lastmod ? '\n' + lastmod : ''}${changefreq ? '\n' + changefreq : ''}${priority ? '\n' + priority : ''}${alternatesXml}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;
}

/**
 * Generate sitemap index XML
 */
export function generateSitemapIndex(sitemaps: Array<{ loc: string; lastmod?: Date | string }>): string {
  const sitemapEntries = sitemaps.map((sitemap) => {
    const lastmod = sitemap.lastmod ? `    <lastmod>${formatDate(sitemap.lastmod)}</lastmod>` : '';
    return `  <sitemap>
    <loc>${sitemap.loc}</loc>${lastmod ? '\n' + lastmod : ''}
  </sitemap>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`;
}
