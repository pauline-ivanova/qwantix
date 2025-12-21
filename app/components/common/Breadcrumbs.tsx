'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { i18n } from '@/i18n.config';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Visual breadcrumbs component for better UX and SEO
 * Displays navigation path and helps users understand site structure
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbs = items || generateBreadcrumbsFromPath(pathname);

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li 
              key={item.url} 
              className="flex items-center"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span 
                  className="font-medium text-gray-900 dark:text-gray-100"
                  itemProp="name"
                >
                  {index === 0 && <HomeIcon className="h-4 w-4 inline-block mr-1" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">
                    {index === 0 && <HomeIcon className="h-4 w-4 inline-block mr-1" />}
                    {item.name}
                  </span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && (
                <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbsFromPath(pathname: string | null): BreadcrumbItem[] {
  if (!pathname) return [];

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Detect language
  const lang = segments[0] && i18n.locales.includes(segments[0] as any) 
    ? segments[0] 
    : i18n.defaultLocale;
  
  // Add home
  breadcrumbs.push({
    name: 'Home',
    url: `/${lang}`,
  });

  // Build breadcrumbs from segments
  let currentPath = `/${lang}`;
  
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    // Convert slug to readable name
    const name = formatSegmentName(segment);
    
    breadcrumbs.push({
      name,
      url: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Format URL segment to readable name
 */
function formatSegmentName(segment: string): string {
  // Remove hyphens and capitalize
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
