#!/usr/bin/env tsx
/**
 * Script to check content coverage for all landing pages
 * Checks if all services and blog posts have content in all languages
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';

interface ContentStatus {
  slug: string;
  lang: string;
  exists: boolean;
  hasContent: boolean;
  hasFrontmatter: boolean;
  contentLength: number;
  title?: string;
  description?: string;
  errors: string[];
}

interface CoverageReport {
  services: {
    total: number;
    bySlug: Record<string, ContentStatus[]>;
    missing: Array<{ slug: string; lang: string }>;
    empty: Array<{ slug: string; lang: string }>;
  };
  blog: {
    total: number;
    bySlug: Record<string, ContentStatus[]>;
    missing: Array<{ slug: string; lang: string }>;
    empty: Array<{ slug: string; lang: string }>;
  };
  summary: {
    totalServices: number;
    totalBlogPosts: number;
    totalFiles: number;
    missingFiles: number;
    emptyFiles: number;
    completeFiles: number;
  };
}

function checkContentFile(
  contentType: 'services' | 'blog',
  slug: string,
  lang: string
): ContentStatus {
  const contentDirectory = path.join(process.cwd(), 'content', contentType);
  const filePath = path.join(contentDirectory, lang, `${slug}.mdx`);
  
  const status: ContentStatus = {
    slug,
    lang,
    exists: false,
    hasContent: false,
    hasFrontmatter: false,
    contentLength: 0,
    errors: [],
  };

  if (!fs.existsSync(filePath)) {
    status.errors.push('File does not exist');
    return status;
  }

  status.exists = true;

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    status.hasFrontmatter = Object.keys(data).length > 0;
    status.contentLength = content.trim().length;
    status.hasContent = status.contentLength > 0;

    if (data.title) {
      status.title = String(data.title);
    }
    if (data.description) {
      status.description = String(data.description);
    }

    // Additional checks
    if (!status.hasFrontmatter) {
      status.errors.push('No frontmatter found');
    }
    if (!status.hasContent) {
      status.errors.push('Content is empty');
    }
    if (!status.title) {
      status.errors.push('Missing title in frontmatter');
    }
    if (!status.description) {
      status.errors.push('Missing description in frontmatter');
    }
    if (status.contentLength < 100) {
      status.errors.push(`Content is very short (${status.contentLength} chars, minimum recommended: 100)`);
    }

  } catch (error) {
    status.errors.push(`Error reading file: ${error instanceof Error ? error.message : String(error)}`);
  }

  return status;
}

function getAllSlugs(contentType: 'services' | 'blog'): string[] {
  const contentDirectory = path.join(process.cwd(), 'content', contentType);
  const slugs = new Set<string>();

  i18n.locales.forEach((lang) => {
    const langDirectory = path.join(contentDirectory, lang);
    if (fs.existsSync(langDirectory) && fs.statSync(langDirectory).isDirectory()) {
      const fileNames = fs.readdirSync(langDirectory);
      fileNames.forEach((fileName) => {
        if (fileName.endsWith('.mdx')) {
          slugs.add(fileName.replace(/\.mdx$/, ''));
        }
      });
    }
  });

  return Array.from(slugs).sort();
}

function generateReport(): CoverageReport {
  const servicesSlugs = getAllSlugs('services');
  const blogSlugs = getAllSlugs('blog');

  const servicesStatus: Record<string, ContentStatus[]> = {};
  const blogStatus: Record<string, ContentStatus[]> = {};

  const servicesMissing: Array<{ slug: string; lang: string }> = [];
  const servicesEmpty: Array<{ slug: string; lang: string }> = [];
  const blogMissing: Array<{ slug: string; lang: string }> = [];
  const blogEmpty: Array<{ slug: string; lang: string }> = [];

  // Check services
  servicesSlugs.forEach((slug) => {
    servicesStatus[slug] = [];
    i18n.locales.forEach((lang) => {
      const status = checkContentFile('services', slug, lang);
      servicesStatus[slug].push(status);
      
      if (!status.exists) {
        servicesMissing.push({ slug, lang });
      } else if (!status.hasContent) {
        servicesEmpty.push({ slug, lang });
      }
    });
  });

  // Check blog posts
  blogSlugs.forEach((slug) => {
    blogStatus[slug] = [];
    i18n.locales.forEach((lang) => {
      const status = checkContentFile('blog', slug, lang);
      blogStatus[slug].push(status);
      
      if (!status.exists) {
        blogMissing.push({ slug, lang });
      } else if (!status.hasContent) {
        blogEmpty.push({ slug, lang });
      }
    });
  });

  const totalFiles = (servicesSlugs.length + blogSlugs.length) * i18n.locales.length;
  const missingFiles = servicesMissing.length + blogMissing.length;
  const emptyFiles = servicesEmpty.length + blogEmpty.length;
  const completeFiles = totalFiles - missingFiles - emptyFiles;

  return {
    services: {
      total: servicesSlugs.length,
      bySlug: servicesStatus,
      missing: servicesMissing,
      empty: servicesEmpty,
    },
    blog: {
      total: blogSlugs.length,
      bySlug: blogStatus,
      missing: blogMissing,
      empty: blogEmpty,
    },
    summary: {
      totalServices: servicesSlugs.length,
      totalBlogPosts: blogSlugs.length,
      totalFiles,
      missingFiles,
      emptyFiles,
      completeFiles,
    },
  };
}

function printReport(report: CoverageReport) {
  console.log('\n' + '='.repeat(80));
  console.log('CONTENT COVERAGE REPORT');
  console.log('='.repeat(80) + '\n');

  // Summary
  console.log('📊 SUMMARY');
  console.log('-'.repeat(80));
  console.log(`Total Services: ${report.summary.totalServices}`);
  console.log(`Total Blog Posts: ${report.summary.totalBlogPosts}`);
  console.log(`Total Files Expected: ${report.summary.totalFiles}`);
  console.log(`✅ Complete Files: ${report.summary.completeFiles} (${Math.round((report.summary.completeFiles / report.summary.totalFiles) * 100)}%)`);
  console.log(`❌ Missing Files: ${report.summary.missingFiles}`);
  console.log(`⚠️  Empty Files: ${report.summary.emptyFiles}`);
  console.log('');

  // Services
  console.log('🔧 SERVICES');
  console.log('-'.repeat(80));
  report.services.total > 0 && Object.entries(report.services.bySlug).forEach(([slug, statuses]) => {
    const complete = statuses.filter(s => s.exists && s.hasContent).length;
    const total = statuses.length;
    const status = complete === total ? '✅' : complete > 0 ? '⚠️' : '❌';
    console.log(`${status} ${slug}: ${complete}/${total} languages`);
    
    statuses.forEach((status) => {
      if (!status.exists) {
        console.log(`   ❌ ${status.lang}: MISSING`);
      } else if (!status.hasContent) {
        console.log(`   ⚠️  ${status.lang}: EMPTY`);
      } else if (status.errors.length > 0) {
        console.log(`   ⚠️  ${status.lang}: ${status.errors.join(', ')}`);
      } else {
        console.log(`   ✅ ${status.lang}: OK (${status.contentLength} chars)`);
      }
    });
  });
  console.log('');

  // Blog
  console.log('📝 BLOG POSTS');
  console.log('-'.repeat(80));
  report.blog.total > 0 && Object.entries(report.blog.bySlug).forEach(([slug, statuses]) => {
    const complete = statuses.filter(s => s.exists && s.hasContent).length;
    const total = statuses.length;
    const status = complete === total ? '✅' : complete > 0 ? '⚠️' : '❌';
    console.log(`${status} ${slug}: ${complete}/${total} languages`);
    
    statuses.forEach((status) => {
      if (!status.exists) {
        console.log(`   ❌ ${status.lang}: MISSING`);
      } else if (!status.hasContent) {
        console.log(`   ⚠️  ${status.lang}: EMPTY`);
      } else if (status.errors.length > 0) {
        console.log(`   ⚠️  ${status.lang}: ${status.errors.join(', ')}`);
      } else {
        console.log(`   ✅ ${status.lang}: OK (${status.contentLength} chars)`);
      }
    });
  });
  console.log('');

  // Missing files
  if (report.services.missing.length > 0 || report.blog.missing.length > 0) {
    console.log('❌ MISSING FILES');
    console.log('-'.repeat(80));
    if (report.services.missing.length > 0) {
      console.log('Services:');
      report.services.missing.forEach(({ slug, lang }) => {
        console.log(`  - ${slug} (${lang})`);
      });
    }
    if (report.blog.missing.length > 0) {
      console.log('Blog:');
      report.blog.missing.forEach(({ slug, lang }) => {
        console.log(`  - ${slug} (${lang})`);
      });
    }
    console.log('');
  }

  // Empty files
  if (report.services.empty.length > 0 || report.blog.empty.length > 0) {
    console.log('⚠️  EMPTY FILES');
    console.log('-'.repeat(80));
    if (report.services.empty.length > 0) {
      console.log('Services:');
      report.services.empty.forEach(({ slug, lang }) => {
        console.log(`  - ${slug} (${lang})`);
      });
    }
    if (report.blog.empty.length > 0) {
      console.log('Blog:');
      report.blog.empty.forEach(({ slug, lang }) => {
        console.log(`  - ${slug} (${lang})`);
      });
    }
    console.log('');
  }

  console.log('='.repeat(80) + '\n');
}

async function main() {
  try {
    const report = generateReport();
    printReport(report);

    // Exit with error code if there are missing or empty files
    if (report.summary.missingFiles > 0 || report.summary.emptyFiles > 0) {
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error generating report:', error);
    process.exit(1);
  }
}

main();

