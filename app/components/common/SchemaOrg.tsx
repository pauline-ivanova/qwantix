import { Locale } from '@/i18n.config';

interface SchemaOrgProps {
  lang: string;
  type?: 'Organization' | 'WebPage' | 'Service' | 'Article';
  data?: any;
}

export default function SchemaOrg({ lang, type = 'Organization', data }: SchemaOrgProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Qwantix Agency',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/favicon.png`,
      width: '180',
      height: '180',
    },
    sameAs: [
      'https://linkedin.com/company/qwantix',
      // Add other social media links
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@qwantix.agency',
      contactType: 'customer service',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3F Commutation Plaza, London Road',
      addressLocality: 'Liverpool',
      postalCode: 'L3 8HR',
      addressCountry: 'GB',
    },
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/${lang}/#webpage`,
    url: `${baseUrl}/${lang}`,
    name: 'Qwantix: Digital Marketing Powered by Analytics',
    description: 'Grow your business with digital marketing powered by analytics',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: lang,
  };

  const schema = type === 'Organization' ? organizationSchema : webpageSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data || schema) }}
    />
  );
}

