/**
 * Utility functions for working with MDX content files
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';

export interface ContentFile {
  slug: string;
  filePath: string;
  lang: string;
  frontmatter: Record<string, any>;
  content: string;
  lastModified?: Date;
}

/**
 * Get all MDX files from a content directory
 */
export function getAllContentFiles(
  contentType: 'services' | 'blog',
  lang?: string
): ContentFile[] {
  const contentDirectory = path.join(process.cwd(), 'content', contentType);
  const files: ContentFile[] = [];
  const languages = lang ? [lang] : i18n.locales;

  languages.forEach((l) => {
    const langDirectory = path.join(contentDirectory, l);
    
    if (!fs.existsSync(langDirectory) || !fs.lstatSync(langDirectory).isDirectory()) {
      return;
    }

    const fileNames = fs.readdirSync(langDirectory);
    
    fileNames.forEach((fileName) => {
      if (!fileName.endsWith('.mdx')) return;
      
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(langDirectory, fileName);
      
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = fs.statSync(fullPath);

        files.push({
          slug,
          filePath: fullPath,
          lang: l,
          frontmatter: data as Record<string, any>,
          content,
          lastModified: stats.mtime,
        });
      } catch (error) {
        console.error(`Error reading file ${fullPath}:`, error);
      }
    });
  });

  return files;
}

/**
 * Get a single content file by slug and language
 */
export function getContentFile(
  contentType: 'services' | 'blog',
  lang: string,
  slug: string,
  fallbackToEnglish: boolean = true
): ContentFile | null {
  const contentDirectory = path.join(process.cwd(), 'content', contentType);
  const candidateLanguages = fallbackToEnglish ? [lang, 'en'] : [lang];

  for (const candidateLang of candidateLanguages) {
    const filePath = path.join(contentDirectory, candidateLang, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = fs.statSync(filePath);

        return {
          slug,
          filePath,
          lang: candidateLang,
          frontmatter: data as Record<string, any>,
          content,
          lastModified: stats.mtime,
        };
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
      }
    }
  }

  return null;
}

/**
 * Get all slugs for a content type across all languages
 */
export function getAllContentSlugs(contentType: 'services' | 'blog'): string[] {
  const contentDirectory = path.join(process.cwd(), 'content', contentType);
  const slugs = new Set<string>();

  i18n.locales.forEach((lang) => {
    const langDirectory = path.join(contentDirectory, lang);
    
    if (!fs.existsSync(langDirectory) || !fs.lstatSync(langDirectory).isDirectory()) {
      return;
    }

    const fileNames = fs.readdirSync(langDirectory);
    fileNames.forEach((fileName) => {
      if (fileName.endsWith('.mdx')) {
        slugs.add(fileName.replace(/\.mdx$/, ''));
      }
    });
  });

  return Array.from(slugs);
}

/**
 * Get content files grouped by slug (all language versions)
 */
export function getContentFilesBySlug(
  contentType: 'services' | 'blog',
  slug: string
): ContentFile[] {
  const files: ContentFile[] = [];

  i18n.locales.forEach((lang) => {
    const file = getContentFile(contentType, lang, slug, false);
    if (file) {
      files.push(file);
    }
  });

  return files;
}

/**
 * Parse frontmatter metadata from a content file
 */
export function parseFrontmatter(filePath: string): Record<string, any> | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data as Record<string, any>;
  } catch (error) {
    console.error(`Error parsing frontmatter from ${filePath}:`, error);
    return null;
  }
}

/**
 * Get file modification time
 */
export function getFileModTime(filePath: string): Date | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return null;
  }
}

/**
 * Check if a content file exists
 */
export function contentFileExists(
  contentType: 'services' | 'blog',
  lang: string,
  slug: string
): boolean {
  const contentDirectory = path.join(process.cwd(), 'content', contentType);
  const filePath = path.join(contentDirectory, lang, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

/**
 * Get all content files filtered by frontmatter field
 */
export function getContentFilesByField(
  contentType: 'services' | 'blog',
  field: string,
  value: any,
  lang?: string
): ContentFile[] {
  const allFiles = getAllContentFiles(contentType, lang);
  return allFiles.filter((file) => file.frontmatter[field] === value);
}

/**
 * Get content files sorted by a frontmatter field
 */
export function getContentFilesSorted(
  contentType: 'services' | 'blog',
  sortField: string,
  order: 'asc' | 'desc' = 'asc',
  lang?: string
): ContentFile[] {
  const allFiles = getAllContentFiles(contentType, lang);
  
  return allFiles.sort((a, b) => {
    const aValue = a.frontmatter[sortField];
    const bValue = b.frontmatter[sortField];
    
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
}
