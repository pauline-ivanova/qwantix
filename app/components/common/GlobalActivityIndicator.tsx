'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

// Global tiny indicator that shows whenever the app is working (ongoing fetches or navigation).
export default function GlobalActivityIndicator() {
  const pathname = usePathname();
  const [isWorking, setIsWorking] = useState(false);
  const activeOperations = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect language from pathname
  const detectedLang = (() => {
    const first = pathname?.split('/')[1] || '';
    return i18n.locales.includes(first as any) ? first : i18n.defaultLocale;
  })();

  const isEs = detectedLang === 'es';
  const isDe = detectedLang === 'de';
  const isRu = detectedLang === 'ru';

  const loadingText = isEs 
    ? 'Cargando…' 
    : isDe 
    ? 'Lädt…' 
    : isRu 
    ? 'Загрузка…' 
    : 'Loading…';

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const start = () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
      activeOperations.current += 1;
      setIsWorking(true);
    };

    const finish = () => {
      activeOperations.current = Math.max(0, activeOperations.current - 1);
      if (activeOperations.current === 0) {
        hideTimeout.current = setTimeout(() => {
          setIsWorking(false);
        }, 250); // keep visible a bit to avoid flicker
      }
    };

    // Patch fetch once per page load to track network work.
    const win = window as typeof window & { __globalFetchPatched?: boolean };
    if (!win.__globalFetchPatched) {
      const originalFetch = window.fetch.bind(window);
      win.__globalFetchPatched = true;
      window.fetch = async (...args) => {
        start();
        try {
          return await originalFetch(...args);
        } finally {
          finish();
        }
      };
    }

    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
    };
  }, []);

  // Also show a short pulse on route changes to indicate navigation is in progress.
  useEffect(() => {
    if (!pathname) return undefined;
    // Treat navigation as an operation with a minimum visible window.
    setIsWorking(true);
    activeOperations.current += 1;

    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
    }

    navigationTimeout.current = setTimeout(() => {
      activeOperations.current = Math.max(0, activeOperations.current - 1);
      if (activeOperations.current === 0) {
        setIsWorking(false);
      }
    }, 500);

    return () => {
      if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
    };
  }, [pathname]);

  if (!isWorking) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[60] flex items-center gap-3 rounded-full bg-white/90 dark:bg-gray-800/90 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-lg ring-1 ring-black/10 dark:ring-white/10 backdrop-blur"
      role="status"
      aria-live="polite"
    >
      <span 
        className="h-3.5 w-3.5 rounded-full border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin" 
        aria-hidden="true" 
      />
      <span>{loadingText}</span>
    </div>
  );
}
