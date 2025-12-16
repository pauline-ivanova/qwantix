import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory, getAllPosts } from '@/lib/posts';

interface RelatedPostsProps {
  lang: string;
  category: string;
  currentSlug?: string; // Exclude current post
}

const categoryColors: { [key: string]: string } = {
  'SEO': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
  'PPC': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
  'Content': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
  'Content Creation': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
  'Social Media Marketing': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
  'SMM': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
};

const RelatedPosts = ({ lang, category, currentSlug }: RelatedPostsProps) => {
  // Get posts by category, exclude current post, and limit to 3
  let relatedPosts = getPostsByCategory(lang, category)
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);

  // If we don't have enough posts in the same category, fill with other posts
  if (relatedPosts.length < 3) {
    const allPosts = getAllPosts(lang)
      .filter(post => post.slug !== currentSlug && !relatedPosts.some(rp => rp.slug === post.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...allPosts];
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  const translations = {
    en: {
      title: 'Read More',
      description: 'Continue exploring our blog for more expert insights, tips, and strategies.',
    },
    es: {
      title: 'Leer más',
      description: 'Continúa explorando nuestro blog para más ideas, consejos y estrategias de expertos.',
    },
    de: {
      title: 'Weiterlesen',
      description: 'Entdecken Sie weitere Expertentipps, Strategien und Einblicke in unserem Blog.',
    },
    ru: {
      title: 'Читать далее',
      description: 'Продолжайте изучать наш блог для получения дополнительных экспертных инсайтов, советов и стратегий.',
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t.description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {relatedPosts.map((post) => {
            const colorClasses = categoryColors[post.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            return (
              <article key={post.slug} className="flex flex-col items-start self-start">
                <div className="relative w-full">
                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 dark:bg-gray-800 sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden relative">
                      <Image
                        src={`/api/og/blog/${post.slug}?lang=${lang}`}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                  </Link>
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-sm">
                    <div className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${colorClasses}`} suppressHydrationWarning>
                      {post.category}
                    </div>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300" suppressHydrationWarning>
                      <Link href={`/${lang}/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
