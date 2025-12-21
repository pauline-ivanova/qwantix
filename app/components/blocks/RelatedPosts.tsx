import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory, getAllPosts } from '@/lib/posts';
import { findRelatedContent, extractKeywords } from '@/lib/internal-linking';
import { getCategoryColors } from '@/lib/category-colors';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  date?: string;
}

interface RelatedPostsProps {
  lang: string;
  category: string;
  currentSlug?: string; // Exclude current post
  currentTitle?: string; // For better keyword matching
  currentExcerpt?: string; // For better keyword matching
}

const RelatedPosts = ({ lang, category, currentSlug, currentTitle, currentExcerpt }: RelatedPostsProps) => {
  // Use intelligent internal linking if we have current content info
  let relatedPosts: Post[] = [];
  
  if (currentTitle && currentExcerpt) {
    const keywords = extractKeywords(`${currentTitle} ${currentExcerpt} ${category}`);
    const relatedContent = findRelatedContent(lang, keywords, category, currentSlug, 3);
    
    // Convert to post format
    relatedPosts = relatedContent
      .filter(item => item.type === 'blog')
      .map(item => {
        const post = getAllPosts(lang).find(p => `/${lang}/blog/${p.slug}` === item.url);
        return post;
      })
      .filter((post): post is Post => post !== undefined);
  }
  
  // Fallback to category-based if intelligent linking didn't work well enough
  if (relatedPosts.length < 3) {
    const existingSlugs = new Set(relatedPosts.map(p => p.slug));
    
    let categoryPosts = getPostsByCategory(lang, category)
      .filter(post => post.slug !== currentSlug && !existingSlugs.has(post.slug));

    // Combine existing related posts with category posts
    let combinedPosts = [...relatedPosts, ...categoryPosts].slice(0, 3);

    // If we still don't have enough posts, fill with any other posts
    if (combinedPosts.length < 3) {
      const combinedSlugs = new Set(combinedPosts.map(p => p.slug));
      const allOtherPosts = getAllPosts(lang)
        .filter(post => post.slug !== currentSlug && !combinedSlugs.has(post.slug))
        .slice(0, 3 - combinedPosts.length);
      combinedPosts = [...combinedPosts, ...allOtherPosts];
    }
    
    relatedPosts = combinedPosts;
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
          <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t.title}
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t.description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {relatedPosts.map((post) => {
            const colors = getCategoryColors(post.category);
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
                    <div 
                        className={`relative z-10 rounded-full px-3 py-1.5 font-medium shadow-sm transition-colors duration-200 ${colors.bgAccent}`}
                        style={{ color: colors.borderAccentColor }}
                        suppressHydrationWarning
                    >
                      {post.category}
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                      <Link href={`/${lang}/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </div>
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
