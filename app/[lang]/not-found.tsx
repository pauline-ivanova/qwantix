import Link from 'next/link';
import { Metadata } from 'next';
import { i18n, Locale } from '@/i18n.config';
import { getAllPosts } from '@/lib/posts';
import { getAllServiceSlugs } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Page Not Found - 404',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

interface NotFoundProps {
  params?: Promise<{ lang: string }> | { lang: string };
}

export default async function NotFound({ params }: NotFoundProps) {
  // Handle case when params is not provided (Next.js 16 behavior)
  let lang: Locale = i18n.defaultLocale;
  
  if (params) {
    const resolvedParams = params instanceof Promise ? await params : params;
    if (resolvedParams?.lang && i18n.locales.includes(resolvedParams.lang as any)) {
      lang = resolvedParams.lang as Locale;
    }
  }

  // Get popular content for suggestions
  const recentPosts = getAllPosts(lang).slice(0, 3);
  const services = getAllServiceSlugs()
    .filter(({ params }) => params.lang === lang)
    .slice(0, 3);

  const translations = {
    en: {
      title: "Page Not Found",
      subtitle: "Oops! The page you're looking for doesn't exist.",
      description: "Don't worry, here are some helpful links to get you back on track:",
      backHome: "Back to Home",
      popularPosts: "Popular Blog Posts",
      ourServices: "Our Services",
      searchPlaceholder: "Search our site...",
    },
    es: {
      title: "Página No Encontrada",
      subtitle: "¡Ups! La página que buscas no existe.",
      description: "No te preocupes, aquí tienes algunos enlaces útiles para volver al camino:",
      backHome: "Volver al Inicio",
      popularPosts: "Publicaciones Populares del Blog",
      ourServices: "Nuestros Servicios",
      searchPlaceholder: "Buscar en nuestro sitio...",
    },
    de: {
      title: "Seite Nicht Gefunden",
      subtitle: "Ups! Die Seite, die Sie suchen, existiert nicht.",
      description: "Keine Sorge, hier sind einige hilfreiche Links, um Sie wieder auf den richtigen Weg zu bringen:",
      backHome: "Zurück zur Startseite",
      popularPosts: "Beliebte Blog-Beiträge",
      ourServices: "Unsere Dienstleistungen",
      searchPlaceholder: "Unsere Website durchsuchen...",
    },
    ru: {
      title: "Страница Не Найдена",
      subtitle: "Упс! Страница, которую вы ищете, не существует.",
      description: "Не волнуйтесь, вот несколько полезных ссылок, чтобы вернуться на правильный путь:",
      backHome: "Вернуться на Главную",
      popularPosts: "Популярные Статьи Блога",
      ourServices: "Наши Услуги",
      searchPlaceholder: "Поиск по сайту...",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-lg leading-8 text-indigo-100 mb-8">
            {t.subtitle}
          </p>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center rounded-md bg-indigo-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
          >
            {t.backHome}
          </Link>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-20"
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

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Helpful Links */}
        <div className="mx-auto mt-16 max-w-2xl">
          <p className="text-center text-sm font-semibold text-gray-900 dark:text-white mb-8">
            {t.description}
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Popular Posts */}
            {recentPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t.popularPosts}
                </h3>
                <ul className="space-y-3">
                  {recentPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/${lang}/blog/${post.slug}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Services */}
            {services.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t.ourServices}
                </h3>
                <ul className="space-y-3">
                  {services.map(({ params }) => (
                    <li key={params.slug}>
                      <Link
                        href={`/${params.lang}/services/${params.slug}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm"
                      >
                        {params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
