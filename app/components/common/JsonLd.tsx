interface JsonLdProps {
  data: object | object[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema({
  name,
  url,
  description,
  contactPoint,
  sameAs,
  slogan,
  knowsAbout,
  areaServed,
}: {
  name: string;
  url: string;
  description?: string;
  contactPoint?: {
    contactType: string;
    email?: string;
    telephone?: string;
  };
  sameAs?: string[]; // Social media links
  slogan?: string;
  knowsAbout?: string[]; // Areas of expertise
  areaServed?: Array<{ '@type': string; name: string }>; // Geographic areas served (for regional SEO)
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    description,
    contactPoint: contactPoint
      ? {
          '@type': 'ContactPoint',
          contactType: contactPoint.contactType,
          email: contactPoint.email,
          telephone: contactPoint.telephone,
        }
      : undefined,
  };

  if (sameAs && sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  if (slogan) {
    schema.slogan = slogan;
  }

  if (knowsAbout && knowsAbout.length > 0) {
    schema.knowsAbout = knowsAbout;
  }

  // Add areaServed for regional SEO targeting (Spain, Germany, UK)
  if (areaServed && areaServed.length > 0) {
    schema.areaServed = areaServed;
  }

  return schema;
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema({
  name,
  url,
  description,
  potentialAction,
}: {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
  };

  if (potentialAction) {
    schema.potentialAction = potentialAction;
  }

  return schema;
}

/**
 * Generate Service schema
 */
export function generateServiceSchema({
  name,
  description,
  provider,
  areaServed,
  serviceType,
  url,
}: {
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed?: Array<{ '@type': string; name: string }>;
  serviceType?: string;
  url?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      ...provider,
      '@id': baseUrl,
    },
  };

  if (areaServed && areaServed.length > 0) {
    schema.areaServed = areaServed;
  }

  if (serviceType) {
    schema.serviceType = serviceType;
  }

  if (url) {
    schema.url = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  return schema;
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

/**
 * Generate Article schema for blog posts
 * Updated to support Person authors for EEAT compliance
 */
export function generateArticleSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  publisher,
  reviewer,
}: {
  headline: string;
  description: string;
  author: {
    name: string;
    url?: string;
    type?: 'Person' | 'Organization';
  };
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  publisher?: {
    name: string;
    logo?: string;
  };
  reviewer?: {
    name: string;
    url?: string;
    type?: 'Person' | 'Organization';
  };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const imageUrl = image 
    ? (image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`)
    : undefined;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': author.type || 'Person',
      name: author.name,
      ...(author.url && { url: author.url.startsWith('http') ? author.url : `${baseUrl}${author.url.startsWith('/') ? '' : '/'}${author.url}` }),
    },
    datePublished,
    ...(dateModified && { dateModified }),
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    url: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`,
  };

  // Reviewer for fact-checking and editorial review (EEAT)
  if (reviewer) {
    schema.reviewedBy = {
      '@type': reviewer.type || 'Person',
      name: reviewer.name,
      ...(reviewer.url && { url: reviewer.url.startsWith('http') ? reviewer.url : `${baseUrl}${reviewer.url.startsWith('/') ? '' : '/'}${reviewer.url}` }),
    };
  }

  if (publisher) {
    schema.publisher = {
      '@type': 'Organization',
      name: publisher.name,
      ...(publisher.logo && {
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo.startsWith('http') 
            ? publisher.logo 
            : `${baseUrl}${publisher.logo.startsWith('/') ? '' : '/'}${publisher.logo}`,
        },
      }),
    };
  }

  return schema;
}

/**
 * Generate Review and AggregateRating schema
 */
export function generateReviewSchema({
  reviews,
  aggregateRating,
}: {
  reviews?: Array<{
    author: string;
    reviewBody: string;
    ratingValue: number;
    datePublished?: string;
  }>;
  aggregateRating?: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
    ratingCount: number;
  };
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
  };

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue.toString(),
      bestRating: (aggregateRating.bestRating || 5).toString(),
      worstRating: (aggregateRating.worstRating || 1).toString(),
      ratingCount: aggregateRating.ratingCount.toString(),
    };
  }

  if (reviews && reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.ratingValue.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: review.datePublished || '2025-12-21',
    }));
  }

  return schema;
}

/**
 * Generate HowTo schema for step-by-step instructions
 * Useful for tutorials and guides
 */
export function generateHowToSchema({
  name,
  description,
  step,
  totalTime,
  image,
  url,
}: {
  name: string;
  description: string;
  step: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  totalTime?: string; // ISO 8601 duration (e.g., "PT30M" for 30 minutes)
  image?: string;
  url?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: step.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      ...(s.image && {
        image: s.image.startsWith('http') ? s.image : `${baseUrl}${s.image.startsWith('/') ? '' : '/'}${s.image}`,
      }),
      ...(s.url && {
        url: s.url.startsWith('http') ? s.url : `${baseUrl}${s.url.startsWith('/') ? '' : '/'}${s.url}`,
      }),
    })),
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  if (image) {
    schema.image = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  if (url) {
    schema.url = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  return schema;
}

/**
 * Generate VideoObject schema for video content
 * Useful for YouTube videos, tutorials, and video content
 */
export function generateVideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  publisher,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration (e.g., "PT5M30S" for 5 minutes 30 seconds)
  contentUrl?: string; // Direct video URL
  embedUrl?: string; // Embed URL (e.g., YouTube embed)
  publisher?: {
    name: string;
    logo?: string;
  };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith('http') 
      ? thumbnailUrl 
      : `${baseUrl}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`,
    uploadDate,
  };

  if (duration) {
    schema.duration = duration;
  }

  if (contentUrl) {
    schema.contentUrl = contentUrl.startsWith('http') ? contentUrl : `${baseUrl}${contentUrl.startsWith('/') ? '' : '/'}${contentUrl}`;
  }

  if (embedUrl) {
    schema.embedUrl = embedUrl;
  }

  if (publisher) {
    schema.publisher = {
      '@type': 'Organization',
      name: publisher.name,
      ...(publisher.logo && {
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo.startsWith('http') 
            ? publisher.logo 
            : `${baseUrl}${publisher.logo.startsWith('/') ? '' : '/'}${publisher.logo}`,
        },
      }),
    };
  }

  return schema;
}

/**
 * Generate LocalBusiness schema for local SEO
 * Important for businesses targeting specific geographic locations
 */
export function generateLocalBusinessSchema({
  name,
  description,
  address,
  telephone,
  email,
  url,
  priceRange,
  openingHours,
  image,
  areaServed,
  geo,
  aggregateRating,
}: {
  name: string;
  description?: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
  priceRange?: string; // e.g., "$$" or "€€€"
  openingHours?: string | string[]; // e.g., "Mo-Fr 09:00-17:00" or array of strings
  image?: string;
  areaServed?: Array<{ '@type': string; name: string }>;
  geo?: {
    latitude: number;
    longitude: number;
  };
  aggregateRating?: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
    ratingCount: number;
  };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.addressLocality,
      addressCountry: address.addressCountry,
      ...(address.streetAddress && { streetAddress: address.streetAddress }),
      ...(address.addressRegion && { addressRegion: address.addressRegion }),
      ...(address.postalCode && { postalCode: address.postalCode }),
    },
  };

  if (description) {
    schema.description = description;
  }

  if (telephone) {
    schema.telephone = telephone;
  }

  if (email) {
    schema.email = email;
  }

  if (url) {
    schema.url = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  } else {
    schema.url = baseUrl;
  }

  if (priceRange) {
    schema.priceRange = priceRange;
  }

  if (openingHours) {
    schema.openingHoursSpecification = Array.isArray(openingHours)
      ? openingHours.map(hours => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: hours.split(' ')[0],
          opens: hours.split(' ')[1]?.split('-')[0],
          closes: hours.split(' ')[1]?.split('-')[1],
        }))
      : {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: openingHours.split(' ')[0],
          opens: openingHours.split(' ')[1]?.split('-')[0],
          closes: openingHours.split(' ')[1]?.split('-')[1],
        };
  }

  if (image) {
    schema.image = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  if (areaServed && areaServed.length > 0) {
    schema.areaServed = areaServed;
  }

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue.toString(),
      bestRating: (aggregateRating.bestRating || 5).toString(),
      worstRating: (aggregateRating.worstRating || 1).toString(),
      ratingCount: aggregateRating.ratingCount.toString(),
    };
  }

  return schema;
}

/**
 * Generate Person schema for author pages and EEAT compliance
 */
export function generatePersonSchema({
  name,
  url,
  jobTitle,
  description,
  image,
  sameAs = [],
  worksFor,
  alumniOf,
  knowsAbout = [],
}: {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  worksFor?: {
    '@type': string;
    name: string;
  };
  alumniOf?: Array<{
    '@type': string;
    name: string;
  }>;
  knowsAbout?: string[];
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const imageUrl = image 
    ? (image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`)
    : undefined;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`,
  };

  if (jobTitle) {
    schema.jobTitle = jobTitle;
  }

  if (description) {
    schema.description = description;
  }

  if (imageUrl) {
    schema.image = {
      '@type': 'ImageObject',
      url: imageUrl,
    };
  }

  if (worksFor) {
    schema.worksFor = {
      ...worksFor,
      '@id': baseUrl,
    };
  }

  if (alumniOf && alumniOf.length > 0) {
    schema.alumniOf = alumniOf;
  }

  if (knowsAbout && knowsAbout.length > 0) {
    schema.knowsAbout = knowsAbout;
  }

  if (sameAs && sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  return schema;
}
