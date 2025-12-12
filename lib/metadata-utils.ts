/**
 * Utility functions for generating SEO-optimized metadata for Qwantix Agency
 */

import type { Metadata } from 'next';
import { i18n } from '@/i18n.config';

/**
 * Truncates text to a maximum length, ensuring it ends at a word boundary.
 * Length includes all spaces between words.
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncated = text.substring(0, maxLength - suffix.length);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + suffix;
  }

  return truncated + suffix;
}

/**
 * SEO-optimized title truncation.
 * Recommended length: 45-55 characters (including spaces).
 * Truncates to 55 characters max, ensuring it ends at a word boundary.
 */
export function truncateTitle(title: string, maxLength: number = 55): string {
  return truncateText(title, maxLength);
}

/**
 * SEO-optimized description truncation.
 * Recommended length: up to 150 characters (including spaces).
 * Truncates to 150 characters max, ensuring it ends at a word boundary.
 */
export function truncateDescription(description: string, maxLength: number = 150): string {
  return truncateText(description, maxLength);
}

/**
 * Generates standard metadata fields including robots, keywords, publisher, Open Graph, and Twitter Card.
 * 
 * Note: Title should be 45-55 characters (including spaces), Description should be up to 150 characters (including spaces).
 * Use truncateTitle() and truncateDescription() helpers if needed.
 */
export interface StandardMetadataOptions {
  title: string; // Page title. Recommended: 45-55 characters (including spaces)
  description: string; // Recommended: up to 150 characters (including spaces)
  url: string;
  pagePath?: string;
  image?: string; // Optional image URL for Open Graph (defaults to og-image.jpg)
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
  };
  keywords?: string[];
  language?: string; // Language code (en, de, es, ru)
  alternateLanguages?: Record<string, string>; // Map of language codes to URLs for hreflang
}

/**
 * Maps language codes to locale strings for Open Graph
 */
const languageToLocale: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  ru: 'ru_RU',
};

export function generateStandardMetadata(options: StandardMetadataOptions): Partial<Metadata> {
  const {
    title,
    description,
    url,
    pagePath = '/',
    image,
    robots = { index: true, follow: true },
    keywords = [],
    language = 'en',
    alternateLanguages = {},
  } = options;

  const keywordsString = keywords.length > 0 ? keywords.join(', ') : '';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  
  // Default OG image - use og-image.jpg as fallback
  const ogImage = image || `${baseUrl}/images/og-image.jpg`;
  // Ensure absolute URL for OG image
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  // Build robots string
  const robotsParts: string[] = [];
  if (robots.index === false) {
    robotsParts.push('noindex');
  } else {
    robotsParts.push('index');
  }
  if (robots.follow === false) {
    robotsParts.push('nofollow');
  } else {
    robotsParts.push('follow');
  }
  if (robots.noarchive) robotsParts.push('noarchive');
  if (robots.nosnippet) robotsParts.push('nosnippet');
  if (robots.noimageindex) robotsParts.push('noimageindex');

  // Build hreflang alternates
  const languages: Record<string, string> = {};
  
  // Add current language
  languages[language] = url;
  
  // Add alternate languages if provided
  Object.entries(alternateLanguages).forEach(([lang, langUrl]) => {
    languages[lang] = langUrl;
  });
  
  // Add x-default (usually pointing to English or main language)
  languages['x-default'] = alternateLanguages['en'] || url;

  const metadata: Partial<Metadata> = {
    title: truncateTitle(title),
    description: truncateDescription(description),
    robots: robotsParts.join(', '),
    keywords: keywordsString ? keywordsString : undefined,
    other: {
      'publisher': 'Qwantix Agency',
    },
    alternates: {
      canonical: url,
      languages: languages,
    },
    // Open Graph metadata for social media sharing (Facebook, WhatsApp, Telegram, etc.)
    openGraph: {
      type: 'website',
      url: url,
      title: truncateTitle(title),
      description: truncateDescription(description),
      siteName: 'Qwantix Agency',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: languageToLocale[language] || 'en_US',
      // Add alternate locales for hreflang
      ...(Object.keys(alternateLanguages).length > 0 && {
        alternateLocale: Object.keys(alternateLanguages).map(lang => languageToLocale[lang] || lang),
      }),
    },
    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      title: truncateTitle(title),
      description: truncateDescription(description),
      images: [ogImageUrl],
    },
  };

  return metadata;
}

/**
 * Helper function to generate alternate language URLs for hreflang
 * This creates URLs for all supported languages based on the current path
 */
export function generateAlternateLanguages(
  currentLang: string,
  path: string
): Record<string, string> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const alternates: Record<string, string> = {};

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove language prefix if present
  const pathWithoutLang = cleanPath.split('/').filter((segment, index) => {
    // Skip first segment if it's a language code
    if (index === 0 && i18n.locales.includes(segment as any)) {
      return false;
    }
    return true;
  }).join('/');

  // Generate URLs for all supported languages
  i18n.locales.forEach((lang) => {
    if (lang !== currentLang) {
      const langPath = pathWithoutLang ? `/${lang}/${pathWithoutLang}` : `/${lang}`;
      alternates[lang] = `${baseUrl}${langPath}`;
    }
  });

  return alternates;
}
