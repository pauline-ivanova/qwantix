'use client';

import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId?: string;
}

/**
 * Google Tag Manager component
 * Loads GTM script and initializes dataLayer
 */
export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const id = gtmId || process.env.NEXT_PUBLIC_GTM_ID;

  if (!id) {
    return null;
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

/**
 * Push event to GTM dataLayer
 */
export function pushGTMEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
  pushGTMEvent('page_view', {
    page_path: url,
    page_title: title,
  });
}

/**
 * Track custom events (clicks, form submissions, etc.)
 */
export function trackEvent(
  eventName: string,
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  pushGTMEvent(eventName, {
    event_category: category,
    event_action: action,
    event_label: label,
    value: value,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  pushGTMEvent('scroll_depth', {
    scroll_depth: depth,
  });
}
