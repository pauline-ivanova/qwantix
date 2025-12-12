/**
 * Complete page validation system for Qwantix
 * Validates metadata and schemas for all pages
 */

import { validateMetadata, MetadataRequirements } from './metadata-validator';
import { validateSchemas, SchemaRequirements } from './schema-validator';
import { getAllServiceSlugs } from '@/lib/services';
import { getAllPosts } from '@/lib/posts';
import { getServiceData } from '@/lib/services';
import { i18n } from '@/i18n.config';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

export interface PageValidationResult {
  pagePath: string;
  pageType: 'static' | 'dynamic' | 'layout';
  lang?: string; // Qwantix: language for multilingual pages
  metadataResult?: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  schemaResults?: Array<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    schemaType?: string;
  }>;
  h1Result?: {
    found: boolean;
    text?: string;
    warnings: string[];
  };
  hasMetadata: boolean;
  hasSchemas: boolean;
  overallValid: boolean;
}

export interface ValidationReport {
  totalPages: number;
  validPages: number;
  invalidPages: number;
  pages: PageValidationResult[];
  summary: {
    metadataErrors: number;
    metadataWarnings: number;
    schemaErrors: number;
    schemaWarnings: number;
  };
}

/**
 * Validates a static page by reading its file
 */
export async function validateStaticPage(
  filePath: string,
  metadataRequirements?: MetadataRequirements,
  schemaRequirements?: SchemaRequirements
): Promise<PageValidationResult> {
  const relativePath = path.relative(process.cwd(), filePath);
  const pagePath = '/' + relativePath
    .replace(/^app\//, '')
    .replace(/\/page\.tsx$/, '')
    .replace(/\/route\.ts$/, '')
    .replace(/\/layout\.tsx$/, '');

  const result: PageValidationResult = {
    pagePath,
    pageType: 'static',
    hasMetadata: false,
    hasSchemas: false,
    overallValid: true,
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for metadata export
    const hasMetadataExport = /export\s+(const|async\s+function)\s+metadata/.test(content);
    const hasGenerateMetadata = /export\s+async\s+function\s+generateMetadata/.test(content);
    
    if (hasMetadataExport || hasGenerateMetadata) {
      result.hasMetadata = true;
      result.metadataResult = {
        isValid: true,
        errors: [],
        warnings: [],
      };
    } else {
      result.metadataResult = {
        isValid: false,
        errors: ['No metadata export found'],
        warnings: [],
      };
      result.overallValid = false;
    }

    // Check for schema usage
    const hasJsonLd = /JsonLd|generate.*Schema/.test(content);
    if (hasJsonLd) {
      result.hasSchemas = true;
    }

  } catch (error) {
    result.metadataResult = {
      isValid: false,
      errors: [`Error reading file: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
    };
    result.overallValid = false;
  }

  return result;
}

/**
 * Validates a service page (multilingual)
 */
export async function validateServicePage(
  lang: string,
  slug: string,
  metadataRequirements?: MetadataRequirements,
  schemaRequirements?: SchemaRequirements
): Promise<PageValidationResult> {
  const pagePath = `/${lang}/services/${slug}`;
  const result: PageValidationResult = {
    pagePath,
    pageType: 'dynamic',
    lang,
    hasMetadata: false,
    hasSchemas: false,
    overallValid: true,
  };

  try {
    const serviceData = await getServiceData(lang, slug);
    
    if (!serviceData) {
      result.metadataResult = {
        isValid: false,
        errors: ['Service not found'],
        warnings: [],
      };
      result.overallValid = false;
      return result;
    }

    // Validate metadata
    const metadata: Metadata = {
      title: serviceData.frontmatter.title,
      description: serviceData.frontmatter.description,
    };
    
    const pageMetadataRequirements: MetadataRequirements = {
      ...metadataRequirements,
      requireHreflang: true, // Qwantix: require hreflang for multilingual pages
    };
    
    const metadataResult = validateMetadata(metadata, pagePath, pageMetadataRequirements);
    result.metadataResult = {
      isValid: metadataResult.isValid,
      errors: metadataResult.errors,
      warnings: metadataResult.warnings,
    };
    result.hasMetadata = true;
    
    if (!metadataResult.isValid) {
      result.overallValid = false;
    }
    
    // Check H1
    if (serviceData.frontmatter.title) {
      result.h1Result = {
        found: true,
        text: serviceData.frontmatter.title,
        warnings: [],
      };
    }

    // Validate schemas
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
    const schemas: any[] = [];
    
    // Breadcrumb
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${baseUrl}/${lang}/services` },
        { '@type': 'ListItem', position: 3, name: serviceData.frontmatter.title, item: `${baseUrl}${pagePath}` },
      ],
    });

    // Service schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceData.frontmatter.title,
      description: serviceData.frontmatter.description,
      provider: {
        '@type': 'Organization',
        name: 'Qwantix Agency',
      },
      serviceType: serviceData.frontmatter.category,
      url: `${baseUrl}${pagePath}`,
    });

    // FAQ schema if FAQ data exists
    if (serviceData.faqData && serviceData.faqData.faqs && serviceData.faqData.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: serviceData.faqData.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    const schemaResults = validateSchemas(schemas, pagePath, schemaRequirements);
    result.schemaResults = schemaResults.map(sr => ({
      isValid: sr.isValid,
      errors: sr.errors,
      warnings: sr.warnings,
      schemaType: sr.schemaType,
    }));
    result.hasSchemas = schemas.length > 0;

    const hasSchemaErrors = schemaResults.some(sr => !sr.isValid);
    if (hasSchemaErrors) {
      result.overallValid = false;
    }

  } catch (error) {
    result.metadataResult = {
      isValid: false,
      errors: [`Error validating page: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
    };
    result.overallValid = false;
  }

  return result;
}

/**
 * Validates a blog post page (multilingual)
 */
export async function validateBlogPage(
  lang: string,
  slug: string,
  metadataRequirements?: MetadataRequirements,
  schemaRequirements?: SchemaRequirements
): Promise<PageValidationResult> {
  const pagePath = `/${lang}/blog/${slug}`;
  const result: PageValidationResult = {
    pagePath,
    pageType: 'dynamic',
    lang,
    hasMetadata: false,
    hasSchemas: false,
    overallValid: true,
  };

  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'blog');
    const filePath = path.join(postsDirectory, lang, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      result.metadataResult = {
        isValid: false,
        errors: ['Blog post not found'],
        warnings: [],
      };
      result.overallValid = false;
      return result;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matter = await import('gray-matter');
    const { data } = matter.default(fileContents);

    // Validate metadata
    const metadata: Metadata = {
      title: data.title,
      description: data.excerpt || data.title,
    };
    
    const pageMetadataRequirements: MetadataRequirements = {
      ...metadataRequirements,
      requireHreflang: true, // Qwantix: require hreflang for multilingual pages
    };
    
    const metadataResult = validateMetadata(metadata, pagePath, pageMetadataRequirements);
    result.metadataResult = {
      isValid: metadataResult.isValid,
      errors: metadataResult.errors,
      warnings: metadataResult.warnings,
    };
    result.hasMetadata = true;
    
    if (!metadataResult.isValid) {
      result.overallValid = false;
    }
    
    // Check H1
    if (data.title) {
      result.h1Result = {
        found: true,
        text: data.title,
        warnings: [],
      };
    }

    // Validate schemas
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
    const schemas: any[] = [];
    
    // Breadcrumb
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/${lang}/blog` },
        { '@type': 'ListItem', position: 3, name: data.title, item: `${baseUrl}${pagePath}` },
      ],
    });

    // Article
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.excerpt || data.title,
      url: `${baseUrl}${pagePath}`,
      publisher: {
        '@type': 'Organization',
        name: 'Qwantix Agency',
      },
    });

    const schemaResults = validateSchemas(schemas, pagePath, schemaRequirements);
    result.schemaResults = schemaResults.map(sr => ({
      isValid: sr.isValid,
      errors: sr.errors,
      warnings: sr.warnings,
      schemaType: sr.schemaType,
    }));
    result.hasSchemas = true;

    const hasSchemaErrors = schemaResults.some(sr => !sr.isValid);
    if (hasSchemaErrors) {
      result.overallValid = false;
    }

  } catch (error) {
    result.metadataResult = {
      isValid: false,
      errors: [`Error validating page: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
    };
    result.overallValid = false;
  }

  return result;
}

/**
 * Validates all pages in the application
 */
export async function validateAllPages(
  metadataRequirements?: MetadataRequirements,
  schemaRequirements?: SchemaRequirements
): Promise<ValidationReport> {
  const pages: PageValidationResult[] = [];

  // Validate static pages (main pages for each language)
  for (const lang of i18n.locales) {
    const staticPages = [
      { path: `app/[lang]/page.tsx`, pagePath: `/${lang}` },
      { path: `app/[lang]/privacy/page.tsx`, pagePath: `/${lang}/privacy` },
      { path: `app/[lang]/cookies/page.tsx`, pagePath: `/${lang}/cookies` },
    ];

    for (const staticPage of staticPages) {
      const filePath = path.join(process.cwd(), staticPage.path);
      if (fs.existsSync(filePath)) {
        const result = await validateStaticPage(filePath, metadataRequirements, schemaRequirements);
        result.pagePath = staticPage.pagePath;
        result.lang = lang;
        pages.push(result);
      }
    }
  }

  // Validate service pages (all languages)
  const serviceSlugs = getAllServiceSlugs();
  for (const { params } of serviceSlugs) {
    const result = await validateServicePage(
      params.lang,
      params.slug,
      metadataRequirements,
      schemaRequirements
    );
    pages.push(result);
  }

  // Validate blog pages (all languages)
  for (const lang of i18n.locales) {
    const posts = getAllPosts(lang);
    for (const post of posts) {
      const result = await validateBlogPage(
        lang,
        post.slug,
        metadataRequirements,
        schemaRequirements
      );
      pages.push(result);
    }
  }

  // Calculate summary
  const validPages = pages.filter(p => p.overallValid).length;
  const invalidPages = pages.length - validPages;
  
  const metadataErrors = pages.reduce((sum, p) => 
    sum + (p.metadataResult?.errors.length || 0), 0
  );
  const metadataWarnings = pages.reduce((sum, p) => 
    sum + (p.metadataResult?.warnings.length || 0), 0
  );
  const schemaErrors = pages.reduce((sum, p) => 
    sum + (p.schemaResults?.reduce((s, sr) => s + sr.errors.length, 0) || 0), 0
  );
  const schemaWarnings = pages.reduce((sum, p) => 
    sum + (p.schemaResults?.reduce((s, sr) => s + sr.warnings.length, 0) || 0), 0
  );

  return {
    totalPages: pages.length,
    validPages,
    invalidPages,
    pages,
    summary: {
      metadataErrors,
      metadataWarnings,
      schemaErrors,
      schemaWarnings,
    },
  };
}
