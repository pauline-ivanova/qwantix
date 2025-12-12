interface HeroPreloadProps {
  imagePath: string;
}

/**
 * Server component that adds a preload link for hero image in the document head
 * This improves LCP (Largest Contentful Paint) by starting image download earlier
 * 
 * Note: In Next.js App Router, we use a script tag to inject the preload link
 * as early as possible in the document head
 */
export default function HeroPreload({ imagePath }: HeroPreloadProps) {
  // Ensure absolute URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const absoluteImagePath = imagePath.startsWith('http') 
    ? imagePath 
    : `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (document.querySelector('link[rel="preload"][href="${absoluteImagePath}"]')) return;
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = '${absoluteImagePath}';
            link.setAttribute('fetchpriority', 'high');
            document.head.insertBefore(link, document.head.firstChild);
          })();
        `,
      }}
    />
  );
}
