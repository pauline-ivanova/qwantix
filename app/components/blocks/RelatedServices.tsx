import Link from 'next/link';
import { getAllServiceSlugs } from '@/lib/services';
import { findRelatedContent, extractKeywords } from '@/lib/internal-linking';

interface RelatedServicesProps {
  lang: string;
  currentSlug: string;
  currentTitle?: string;
  currentDescription?: string;
  limit?: number;
}

/**
 * Related Services component
 * Shows related services based on intelligent internal linking
 */
export default function RelatedServices({
  lang,
  currentSlug,
  currentTitle,
  currentDescription,
  limit = 3,
}: RelatedServicesProps) {
  // Get all services for this language
  const allServices = getAllServiceSlugs()
    .filter(({ params }) => params.lang === lang && params.slug !== currentSlug);

  // Use intelligent linking if we have content info
  let relatedServices;
  
  if (currentTitle && currentDescription) {
    const keywords = extractKeywords(`${currentTitle} ${currentDescription}`);
    const relatedContent = findRelatedContent(lang, keywords, undefined, currentSlug, limit);
    
    relatedServices = relatedContent
      .filter(item => item.type === 'service')
      .map(item => {
        const service = allServices.find(s => 
          `/${s.params.lang}/services/${s.params.slug}` === item.url
        );
        return service;
      })
      .filter(Boolean);
  }

  // Fallback to random services if intelligent linking didn't work
  if (!relatedServices || relatedServices.length < limit) {
    relatedServices = allServices.slice(0, limit);
  }

  if (relatedServices.length === 0) {
    return null;
  }

  const translations = {
    en: {
      title: 'Related Services',
      description: 'Explore our other services that might interest you',
      viewAll: 'View All Services',
    },
    es: {
      title: 'Servicios Relacionados',
      description: 'Explora nuestros otros servicios que podrían interesarte',
      viewAll: 'Ver Todos los Servicios',
    },
    de: {
      title: 'Verwandte Dienstleistungen',
      description: 'Entdecken Sie unsere anderen Dienstleistungen, die Sie interessieren könnten',
      viewAll: 'Alle Dienstleistungen Anzeigen',
    },
    ru: {
      title: 'Связанные Услуги',
      description: 'Изучите наши другие услуги, которые могут вас заинтересовать',
      viewAll: 'Посмотреть Все Услуги',
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t.description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {relatedServices.map((service) => {
            if (!service) return null;
            const serviceName = service.params.slug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <Link
                key={service.params.slug}
                href={`/${service.params.lang}/services/${service.params.slug}`}
                className="flex flex-col rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700 hover:ring-indigo-600 dark:hover:ring-indigo-400 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {serviceName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn more about our {serviceName.toLowerCase()} services
                </p>
                <span className="mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Learn more →
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </div>
  );
}
