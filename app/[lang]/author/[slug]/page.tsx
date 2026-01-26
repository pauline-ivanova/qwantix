import { notFound } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { getAuthor } from '@/lib/authors';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import { Metadata } from 'next';
import JsonLd, { generatePersonSchema } from '@/app/components/common/JsonLd';
import Link from 'next/link';
import { 
  ArrowTopRightOnSquareIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import AuroraBackground from '@/app/components/blocks/AuroraBackground';

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> | { lang: string, slug: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang, slug } = resolvedParams;
  const author = getAuthor(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.qwantix.agency';
  const currentUrl = `${baseUrl}/${lang}/author/${slug}`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/author/${slug}`);

  const baseMetadata = generateStandardMetadata({
    title: `${author.name} - ${author.jobTitle}`,
    description: author.description,
    url: currentUrl,
    pagePath: `/${lang}/author/${slug}`,
    keywords: ['SEO', 'digital marketing', 'content strategy', author.name],
    language: lang,
    alternateLanguages,
  });

  return baseMetadata;
}

export default async function AuthorPage({ params }: { params: Promise<{ lang: string, slug: string }> | { lang: string, slug: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang, slug } = resolvedParams;
  const author = getAuthor(slug);

  if (!author) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';

  const translations = {
    en: {
      industriesCovered: 'Industries Covered',
      industriesDescription: "Polina's articles focus on SEO and digital marketing challenges commonly faced by businesses across diverse industries.",
      industriesNote: 'These industries require strong search intent alignment, technical accuracy, and trust signals — all core themes in her writing.',
      whatArticlesCover: 'What Her Articles Cover',
      articlesDescription: 'All topics are approached with scalability, search intent, and long-term performance in mind.',
      editorialApproach: 'Editorial & Methodological Approach',
      editorialDescription: "Articles published under Polina's authorship follow a consistent framework:",
      editorialItems: [
        'Clear alignment with real search intent',
        'Industry-aware language and cautious claims for regulated niches',
        'Examples derived from audits, rebuilds, and live projects',
        'SEO-first structure without sacrificing clarity or UX',
      ],
      languagesMarkets: 'Languages & Markets',
      languagesDescription: 'Polina works directly with source-language SERPs and content, allowing her to analyse intent, competition, and localisation quality without relying on translated datasets.',
      education: 'Education & Academic Background',
    },
    es: {
      industriesCovered: 'Industrias Cubiertas',
      industriesDescription: 'Los artículos de Polina se centran en los desafíos de SEO y marketing digital que comúnmente enfrentan las empresas en diversas industrias.',
      industriesNote: 'Estas industrias requieren una fuerte alineación con la intención de búsqueda, precisión técnica y señales de confianza: todos temas centrales en su escritura.',
      whatArticlesCover: 'Qué Cubren Sus Artículos',
      articlesDescription: 'Todos los temas se abordan pensando en la escalabilidad, la intención de búsqueda y el rendimiento a largo plazo.',
      editorialApproach: 'Enfoque Editorial y Metodológico',
      editorialDescription: 'Los artículos publicados bajo la autoría de Polina siguen un marco consistente:',
      editorialItems: [
        'Alineación clara con la intención de búsqueda real',
        'Lenguaje consciente de la industria y afirmaciones cautelosas para nichos regulados',
        'Ejemplos derivados de auditorías, reconstrucciones y proyectos en vivo',
        'Estructura primero SEO sin sacrificar claridad o UX',
      ],
      languagesMarkets: 'Idiomas y Mercados',
      languagesDescription: 'Polina trabaja directamente con SERPs y contenido en el idioma de origen, lo que le permite analizar la intención, la competencia y la calidad de la localización sin depender de conjuntos de datos traducidos.',
      education: 'Educación y Antecedentes Académicos',
    },
    de: {
      industriesCovered: 'Abgedeckte Branchen',
      industriesDescription: 'Polinas Artikel konzentrieren sich auf SEO- und Digital-Marketing-Herausforderungen, die Unternehmen in verschiedenen Branchen häufig begegnen.',
      industriesNote: 'Diese Branchen erfordern eine starke Ausrichtung auf die Suchintention, technische Genauigkeit und Vertrauenssignale – alles zentrale Themen in ihrer Arbeit.',
      whatArticlesCover: 'Was Ihre Artikel Abdecken',
      articlesDescription: 'Alle Themen werden mit Blick auf Skalierbarkeit, Suchintention und langfristige Leistung angegangen.',
      editorialApproach: 'Redaktioneller und Methodischer Ansatz',
      editorialDescription: 'Artikel, die unter Polinas Autorschaft veröffentlicht werden, folgen einem konsistenten Rahmen:',
      editorialItems: [
        'Klare Ausrichtung auf echte Suchintention',
        'Branchenbewusste Sprache und vorsichtige Behauptungen für regulierte Nischen',
        'Beispiele aus Audits, Rebuilds und Live-Projekten',
        'SEO-first Struktur ohne Klarheit oder UX zu opfern',
      ],
      languagesMarkets: 'Sprachen und Märkte',
      languagesDescription: 'Polina arbeitet direkt mit SERPs und Inhalten in der Quellsprache, was es ihr ermöglicht, Intention, Wettbewerb und Lokalisierungsqualität zu analysieren, ohne sich auf übersetzte Datensätze zu verlassen.',
      education: 'Bildung und Akademischer Hintergrund',
    },
    ru: {
      industriesCovered: 'Охваченные Отрасли',
      industriesDescription: 'Статьи Полины сосредоточены на проблемах SEO и цифрового маркетинга, с которыми обычно сталкиваются предприятия в различных отраслях.',
      industriesNote: 'Эти отрасли требуют сильного соответствия поисковому намерению, технической точности и сигналов доверия — все это основные темы в её работах.',
      whatArticlesCover: 'О Чём Её Статьи',
      articlesDescription: 'Все темы рассматриваются с учётом масштабируемости, поискового намерения и долгосрочной производительности.',
      editorialApproach: 'Редакционный и Методологический Подход',
      editorialDescription: 'Статьи, опубликованные под авторством Полины, следуют последовательной структуре:',
      editorialItems: [
        'Чёткое соответствие реальному поисковому намерению',
        'Отраслевой язык и осторожные утверждения для регулируемых ниш',
        'Примеры из аудитов, реконструкций и живых проектов',
        'SEO-ориентированная структура без ущерба для ясности или UX',
      ],
      languagesMarkets: 'Языки и Рынки',
      languagesDescription: 'Полина работает напрямую с SERP и контентом на исходном языке, что позволяет ей анализировать намерение, конкуренцию и качество локализации без использования переведённых наборов данных.',
      education: 'Образование и Академический Фон',
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const industries = [
    'B2B SaaS & Enterprise Software',
    'Professional Services & Consulting',
    'Recruitment & HR Platforms',
    'Healthcare, Medical & Medical Tourism Services',
    'Education & Online Learning Platforms',
    'E-commerce & Premium Retail',
    'Travel, Tourism & Experience-Based Businesses',
    'Data, Analytics & Visualisation Tools',
    'Local and Multilingual Service Businesses',
  ];

  return (
    <>
      {/* Hero Section */}
      <div id="hero" className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 overflow-hidden">
        <AuroraBackground blendMode="normal" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" style={{ textWrap: 'balance' }} suppressHydrationWarning>
              {author.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl mx-auto">
              {author.jobTitle}
            </p>
            <p className="mt-4 text-base leading-7 text-indigo-200 max-w-xl mx-auto">
              {author.description}
            </p>
            
            {/* Social Links */}
            {(author.socialLinks.linkedin || author.socialLinks.upwork) && (
              <div className="mt-10 flex items-center justify-center gap-4">
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                )}
                {author.socialLinks.upwork && (
                  <a
                    href={author.socialLinks.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    <BriefcaseIcon className="w-5 h-5" />
                    Upwork
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-20 z-10"
          style={{ transform: 'translateY(1px)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Author Bio Section */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 text-lg leading-8">
                {author.bio}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Areas of Expertise - Industries */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>
              {t.industriesCovered}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t.industriesDescription}
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{industry}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              {t.industriesNote}
            </p>
          </div>
        </div>
      </div>

      {/* What Articles Cover */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>
              {t.whatArticlesCover}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t.articlesDescription}
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {author.expertise.map((topic, index) => (
                <div key={index} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {topic}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Editorial Approach */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8" suppressHydrationWarning>
              {t.editorialApproach}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t.editorialDescription}
            </p>
            <div className="space-y-4">
              {t.editorialItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Languages & Markets */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <GlobeAltIcon className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>
              {t.languagesMarkets}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t.languagesDescription}
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap justify-center gap-3">
              {author.languages.map((language, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-800"
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>
                {t.education}
              </h2>
            </div>
            <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
              {author.education}
            </p>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <JsonLd
        data={[
          generatePersonSchema({
            name: author.name,
            url: `${baseUrl}/${lang}/author/${slug}`,
            jobTitle: author.jobTitle,
            description: author.description,
            sameAs: [
              ...(author.socialLinks.linkedin ? [author.socialLinks.linkedin] : []),
              ...(author.socialLinks.upwork ? [author.socialLinks.upwork] : []),
            ],
            knowsAbout: author.expertise,
            worksFor: {
              '@type': 'Organization',
              name: 'Qwantix Agency',
            },
          }),
        ]}
      />
    </>
  );
}

export async function generateStaticParams() {
  const { locales } = i18n;
  const paths: { lang: string, slug: string }[] = [];

  // Import getAllAuthors dynamically to avoid circular dependencies
  const { getAllAuthors } = await import('@/lib/authors');
  const authors = getAllAuthors();

  for (const lang of locales) {
    for (const author of authors) {
      paths.push({
        lang: lang,
        slug: author.slug,
      });
    }
  }

  return paths;
}

