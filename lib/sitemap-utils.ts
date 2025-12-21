/**
 * Utility functions for generating sitemap URLs
 */

import { i18n } from '@/i18n.config';
import { getAllServiceSlugs } from '@/lib/services';
import { getAllPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';

// Fixed date for all metadata as requested by the user: December 21, 2025
const FIXED_DATE = new Date('2025-12-21T12:00:00Z');

/**
 * Maps language codes to regional variants for hreflang
 * This helps with regional SEO targeting (Spain, Germany, UK)
 */
const languageToRegional: Record<string, string> = {
  en: 'en-GB', // UK English for regional targeting
  de: 'de-DE', // Germany
  es: 'es-ES', // Spain
  ru: 'ru-RU', // Russia
};

/**
 * Helper to add regional hreflang variants to alternates
 */
function addRegionalAlternates(alternates: Record<string, string>): Record<string, string> {
  const result = { ...alternates };
  
  // Add regional variants for each language
  Object.entries(alternates).forEach(([lang, url]) => {
    const regional = languageToRegional[lang];
    if (regional) {
      result[regional] = url;
    }
  });
  
  return result;
}

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
 * Generate URLs for main pages (home pages for each language)
 */
export function getMainPageUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  i18n.locales.forEach((lang) => {
    const alternates: Record<string, string> = {};
    i18n.locales.forEach((altLang) => {
      alternates[altLang] = `${baseUrl}/${altLang}`;
    });

    // Add regional variants for better regional SEO
    const alternatesWithRegional = addRegionalAlternates(alternates);

    urls.push({
      url: `${baseUrl}/${lang}`,
      lastModified: FIXED_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: alternatesWithRegional,
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
      const alternates: Record<string, string> = {};
      serviceLangs.forEach((altLang) => {
        alternates[altLang] = `${baseUrl}/${altLang}/services/${slug}`;
      });

      // Add regional variants for better regional SEO
      const alternatesWithRegional = addRegionalAlternates(alternates);

      urls.push({
        url: `${baseUrl}/${lang}/services/${slug}`,
        lastModified: FIXED_DATE,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: alternatesWithRegional,
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
      const alternates: Record<string, string> = {};
      langs.forEach(({ lang: altLang }) => {
        alternates[altLang] = `${baseUrl}/${altLang}/blog/${slug}`;
      });

      // Add regional variants for better regional SEO
      const alternatesWithRegional = addRegionalAlternates(alternates);

      urls.push({
        url: `${baseUrl}/${lang}/blog/${slug}`,
        lastModified: FIXED_DATE,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: alternatesWithRegional,
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
  const legalPages = ['privacy', 'cookies', 'impressum', 'terms', 'ai-policy', 'accessibility'];

  legalPages.forEach((page) => {
    const alternates: Record<string, string> = {};
    i18n.locales.forEach((lang) => {
      alternates[lang] = `${baseUrl}/${lang}/${page}`;
    });

    // Add regional variants for better regional SEO
    const alternatesWithRegional = addRegionalAlternates(alternates);

    i18n.locales.forEach((lang) => {
      urls.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: FIXED_DATE,
        changeFrequency: 'monthly',
        priority: 0.3,
        alternates: {
          languages: alternatesWithRegional,
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
  if (!date) return FIXED_DATE.toISOString();
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
    const lastmod = `    <lastmod>${formatDate(FIXED_DATE)}</lastmod>`;
    return `  <sitemap>
    <loc>${sitemap.loc}</loc>${lastmod ? '\n' + lastmod : ''}
  </sitemap>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`;
}
