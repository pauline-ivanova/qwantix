'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pushGTMEvent } from './GoogleTagManager';

/**
 * Core Web Vitals tracking component
 * Tracks LCP, FID, CLS, FCP, TTFB metrics and sends to analytics
 */
export default function CoreWebVitals() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Check if web-vitals library is available (optional dependency)
    if (typeof window === 'undefined') return;

    // Try to import web-vitals dynamically (optional dependency)
    // Install with: npm install web-vitals
    // If not installed, will fallback to manual tracking
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      // Largest Contentful Paint (LCP)
      onLCP((metric) => {
        pushGTMEvent('web_vitals', {
          metric_name: 'LCP',
          metric_value: Math.round(metric.value),
          metric_id: metric.id,
          metric_delta: Math.round(metric.delta),
          page_path: pathname,
        });
      });

      // Interaction to Next Paint (INP) - new metric
      onINP((metric) => {
        pushGTMEvent('web_vitals', {
          metric_name: 'INP',
          metric_value: Math.round(metric.value),
          metric_id: metric.id,
          metric_delta: Math.round(metric.delta),
          page_path: pathname,
        });
      });

      // Cumulative Layout Shift (CLS)
      onCLS((metric) => {
        pushGTMEvent('web_vitals', {
          metric_name: 'CLS',
          metric_value: Math.round(metric.value * 1000) / 1000, // Keep 3 decimal places
          metric_id: metric.id,
          metric_delta: Math.round(metric.delta * 1000) / 1000,
          page_path: pathname,
        });
      });

      // First Contentful Paint (FCP)
      onFCP((metric) => {
        pushGTMEvent('web_vitals', {
          metric_name: 'FCP',
          metric_value: Math.round(metric.value),
          metric_id: metric.id,
          metric_delta: Math.round(metric.delta),
          page_path: pathname,
        });
      });

      // Time to First Byte (TTFB)
      onTTFB((metric) => {
        pushGTMEvent('web_vitals', {
          metric_name: 'TTFB',
          metric_value: Math.round(metric.value),
          metric_id: metric.id,
          metric_delta: Math.round(metric.delta),
          page_path: pathname,
        });
      });
    }).catch((error) => {
      // web-vitals not installed, use manual tracking
      console.warn('web-vitals library not available, using manual tracking');
      trackManualWebVitals();
    });
  }, [pathname]);

  return null;
}

/**
 * Manual Core Web Vitals tracking (fallback)
 * Uses Performance API when web-vitals library is not available
 */
function trackManualWebVitals() {
  if (typeof window === 'undefined' || !window.performance) return;

  // Track TTFB
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    const ttfb = navigation.responseStart - navigation.requestStart;
    pushGTMEvent('web_vitals', {
      metric_name: 'TTFB',
      metric_value: Math.round(ttfb),
      page_path: window.location.pathname,
    });
  }

  // Track FCP using PerformanceObserver
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          pushGTMEvent('web_vitals', {
            metric_name: 'FCP',
            metric_value: Math.round(entry.startTime),
            page_path: window.location.pathname,
          });
          observer.disconnect();
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    // PerformanceObserver not supported
  }
}
