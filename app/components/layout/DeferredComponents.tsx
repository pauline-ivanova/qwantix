'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Defer CookieConsent until after page is interactive
const CookieConsent = dynamic(() => import("@/app/components/common/CookieConsent"), {
  ssr: false,
});

// Defer GlobalActivityIndicator until after page is interactive
const GlobalActivityIndicator = dynamic(() => import("@/app/components/common/GlobalActivityIndicator"), {
  ssr: false,
});

export default function DeferredComponents() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Wait for page to be interactive before loading these components
    // This reduces TBT by not blocking the main thread
    if (typeof window !== 'undefined') {
      // Use requestIdleCallback if available, otherwise setTimeout
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          setShouldLoad(true);
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          setShouldLoad(true);
        }, 2000);
      }
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <CookieConsent />
      <GlobalActivityIndicator />
    </>
  );
}
