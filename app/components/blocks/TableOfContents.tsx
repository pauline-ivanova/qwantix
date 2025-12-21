'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { getCategoryColors, type CategoryColors } from '@/lib/category-colors';
import { type TocItem } from '@/lib/toc-parser';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

interface TableOfContentsProps {
  items: TocItem[];
  category?: string;
}

const tocTranslations = {
  en: 'Table of Contents',
  es: 'Tabla de Contenidos',
  de: 'Inhaltsverzeichnis',
  ru: 'Содержание',
};

export default function TableOfContents({ items, category = 'SEO' }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const detectedLang = (() => {
    const first = pathname?.split('/')[1] || '';
    return i18n.locales.includes(first as any) ? first : i18n.defaultLocale;
  })() as keyof typeof tocTranslations;
  
  const tocTitle = tocTranslations[detectedLang] || tocTranslations.en;
  const colors = getCategoryColors(category);

  if (!items || items.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL without triggering scroll
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const renderTocItem = (item: TocItem, index: number) => {
    const isH2 = item.level === 2;
    // Use combination of index and id to ensure unique keys
    const uniqueKey = `${item.id}-${index}`;
    
    return (
      <li key={uniqueKey} className="group">
        <a
          href={`#${item.id}`}
          onClick={(e) => scrollToHeading(item.id, e)}
          className={`
            flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-200
            ${isH2 ? `font-bold ${colors.text}` : 'font-medium text-sm text-gray-600 dark:text-gray-400'}
            ${colors.hoverBg} ${colors.hoverText}
          `}
        >
           {/* Marker Container - ensures alignment */}
           <div className="flex-shrink-0 w-5 flex justify-center items-center">
             <span className={`
               relative rounded-full border-2 box-border
               ${isH2 
                 ? `w-3.5 h-3.5 ring-4 ring-white dark:ring-gray-900 ${colors.borderAccent} bg-white dark:bg-gray-900` 
                 : `w-2.5 h-2.5 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 group-hover:border-gray-400 dark:group-hover:border-gray-500`
               }
             `}>
               {/* Inner dot for H2 */}
               {isH2 && (
                 <span 
                   className="absolute inset-0.5 rounded-full"
                   style={{ backgroundColor: colors.borderAccentColor }}
                 ></span>
               )}
             </span>
           </div>
           
          <span className="block">
            {item.text}
          </span>
        </a>
      </li>
    );
  };

  return (
    <div className={`my-8 rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.fromGradient} ${colors.viaGradient} ${colors.toGradient} shadow-lg relative overflow-hidden ${isExpanded ? 'w-full' : 'w-fit'}`}>
      {/* Decorative background elements */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bgAccent} rounded-full -mr-16 -mt-16 blur-2xl`}></div>
      <div className={`absolute bottom-0 left-0 w-24 h-24 ${colors.bgAccent} rounded-full -ml-12 -mb-12 blur-xl`}></div>
      
      <div className="relative z-10">
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200 rounded-t-2xl"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center p-2 rounded-lg ${colors.bg} ${colors.textAccent}`}>
              <ListBulletIcon className="h-5 w-5" />
            </div>
            <div className={`text-lg font-bold ${colors.text} m-0`} role="heading" aria-level={2} suppressHydrationWarning>
              {tocTitle}
            </div>
          </div>
          <div className={`flex-shrink-0 ${colors.textAccent} ml-4`}>
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </div>
        </button>

        {/* Content - collapsible */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-5 pb-6" aria-label={tocTitle}>
            <ul className="space-y-1 list-none p-0 m-0">
              {items.map((item, index) => renderTocItem(item, index))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
