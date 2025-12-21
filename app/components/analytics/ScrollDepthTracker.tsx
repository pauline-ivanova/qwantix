'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from './GoogleTagManager';

/**
 * Tracks scroll depth and sends events to analytics
 * Tracks at 25%, 50%, 75%, and 100% scroll depth
 */
export default function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackedDepths = new Set<number>();
    const depths = [25, 50, 75, 100];

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      depths.forEach(depth => {
        if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          trackScrollDepth(depth);
        }
      });
    };

    // Reset on route change
    trackedDepths.clear();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return null;
}
