'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

/**
 * Client component to set HTML lang attribute dynamically
 * This is needed because Next.js 13+ root layout cannot be dynamic
 */
export default function HtmlLangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract language from pathname
    const firstSegment = pathname?.split('/')[1] || '';
    const lang = i18n.locales.includes(firstSegment as any) ? firstSegment : i18n.defaultLocale;
    
    // Set HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
