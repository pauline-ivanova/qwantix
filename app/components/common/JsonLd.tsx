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
      datePublished: review.datePublished || new Date().toISOString().split('T')[0],
    }));
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
