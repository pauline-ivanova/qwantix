import { getDictionary } from '@/lib/dictionaries';
import CaseStudiesFilter from '@/app/components/blocks/CaseStudiesFilter';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/case-studies`;
  
  const translations = {
    en: {
      title: 'SEO Case Studies & Success Stories | Qwantix Agency',
      description: 'Explore our portfolio of strategy-led SEO projects. Real outcomes across healthcare, finance, B2B, and e-commerce markets.',
    },
    es: {
      title: 'Casos de Estudio de SEO y Éxito | Agencia Qwantix',
      description: 'Explora nuestra cartera de proyectos de SEO liderados por la estrategia. Resultados reales en mercados de salud, finanzas, B2B y e-commerce.',
    },
    de: {
      title: 'SEO Case Studies & Erfolgsgeschichten | Qwantix Agentur',
      description: 'Entdecken Sie unser Portfolio an strategieorientierten SEO-Projekten. Echte Ergebnisse in den Bereichen Gesundheit, Finanzen, B2B und E-Commerce.',
    },
    ru: {
      title: 'Кейсы по SEO и истории успеха | Агентство Qwantix',
      description: 'Ознакомьтесь с нашим портфолио SEO-проектов. Реальные результаты в сферах медицины, финансов, B2B и электронной коммерции.',
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  const alternateLanguages = generateAlternateLanguages(lang, `/case-studies`);

  return {
    ...generateStandardMetadata({
      title: t.title,
      description: t.description,
      url: currentUrl,
      pagePath: `/${lang}/case-studies`,
      language: lang,
      alternateLanguages,
    }),
  };
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;

  const t = {
    en: {
      title: 'Strategy-led SEO. Proven across industries.',
      description: 'A structured overview of anonymised projects delivered across healthcare, finance, B2B, and service-based businesses. Each case reflects a specific strategic challenge and the SEO decisions behind measurable outcomes.',
    },
    es: {
      title: 'SEO guiado por la estrategia. Probado en todas las industrias.',
      description: 'Una visión general estructurada de proyectos anonimizados entregados en salud, finanzas, B2B y negocios basados en servicios.',
    },
    de: {
      title: 'Strategieorientiertes SEO. Branchenübergreifend bewährt.',
      description: 'Ein strukturierter Überblick über anonymisierte Projekte aus den Bereichen Gesundheit, Finanzen, B2B und Dienstleistungen.',
    },
    ru: {
      title: 'SEO на основе стратегии. Проверено в разных нишах.',
      description: 'Структурированный обзор анонимизированных проектов в сферах медицины, финансов, B2B и сервисного бизнеса.',
    }
  }[lang as keyof { en: any, es: any, de: any, ru: any }] || {
    title: 'Strategy-led SEO. Proven across industries.',
    description: 'A structured overview of anonymised projects delivered across healthcare, finance, B2B, and service-based businesses.',
  };

  return (
    <>
      <div className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" suppressHydrationWarning>{t.title}</h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl mx-auto">
              {t.description}
            </p>
        </div>
        <div
            className="absolute bottom-0 left-0 w-full h-20"
            style={{ transform: 'translateY(1px)' }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="text-white dark:text-gray-900"
              ></path>
            </svg>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CaseStudiesFilter lang={lang} />
        </div>
      </div>
    </>
  );
}

