'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
};

const categoryColors: { [key: string]: string } = {
  'SEO': 'bg-indigo-100 text-indigo-800',
  'PPC': 'bg-green-100 text-green-800',
  'Content': 'bg-pink-100 text-pink-800',
};

const BlogPreview = ({ initialPosts, lang, baseUrl }: { initialPosts: Post[], lang: string, baseUrl?: string }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts.slice(0, 3));
  const [categories, setCategories] = useState<string[]>(['All', ...Array.from(new Set(initialPosts.map(p => p.category)))]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const siteUrl = baseUrl || (typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'));

  useEffect(() => {
    setFilteredPosts(initialPosts.slice(0, 3));
    const uniqueCategories = ['All', ...Array.from(new Set(initialPosts.map(p => p.category)))];
    setCategories(uniqueCategories);
    setSelectedCategory('All');
  }, [initialPosts]);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredPosts(initialPosts.slice(0, 3));
    } else {
      setFilteredPosts(initialPosts.filter(post => post.category === category).slice(0, 3));
    }
  };
  
  return (
    <div className="bg-white dark:bg-[#061423] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl no-hyphen-break" suppressHydrationWarning>
                    {lang === 'es' ? 'Qwantix Insights: Tu centro de recursos de marketing digital' : lang === 'de' ? 'Qwantix Insights: Ihr Wissenshub für Online‑Marketing' : lang === 'ru' ? 'Qwantix Insights: ваш хаб по онлайн‑маркетингу' : 'Qwantix Insights: Your Online Marketing Resource Hub'}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {lang === 'es' ? 'Mantente a la vanguardia con ideas, consejos y estrategias de nuestros expertos. Nuestro blog es tu recurso para tendencias y buenas prácticas en marketing digital.' : lang === 'de' ? 'Bleiben Sie vorn mit Insights, Tipps und Strategien unserer Expert:innen. Unser Blog ist Ihr Anlaufpunkt für Trends und Best Practices im digitalen Marketing.' : lang === 'ru' ? 'Будьте впереди за счёт инсайтов, советов и стратегий экспертов. Блог — ваш источник трендов и best practices в digital.' : 'Stay ahead of the digital curve with our expert insights, tips, and strategies. Our blog is your go-to resource for the latest trends and best practices in digital marketing.'}
                </p>
            </div>
            <div className="mt-10 flex justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilter(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang === 'es' && category === 'All' ? 'Todas' : (lang === 'de' && category === 'All' ? 'Alle' : (lang === 'ru' && category === 'All' ? 'Все' : category))}
                </button>
              ))}
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {(filteredPosts.length > 0 ? filteredPosts : []).map((post) => {
                    const colorClasses = categoryColors[post.category] || 'bg-gray-100 text-gray-800';
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
                                <div className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${colorClasses}`}>
                                  {post.category}
                                </div>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                  <Link href={`/${lang}/blog/${post.slug}`}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                  </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                            </div>
                            </div>
                        </article>
                )
            })}
            </div>
            {filteredPosts.length === 0 && (
              <div className="mx-auto mt-12 max-w-2xl text-center text-gray-600 dark:text-gray-300">
                {lang === 'es' ? 'Aún no hay artículos disponibles en español. Vuelve pronto.' : lang === 'de' ? 'Noch keine Artikel auf Deutsch vorhanden. Schauen Sie bald wieder vorbei.' : lang === 'ru' ? 'Статей на русском пока нет. Загляните позже.' : 'No posts available yet. Check back soon.'}
              </div>
            )}
            <div className="mt-20 text-center">
              <Link href={`/${lang}/blog`} className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {lang === 'es' ? 'Ver todos los artículos' : lang === 'de' ? 'Alle Artikel ansehen' : lang === 'ru' ? 'Все статьи' : 'View All Posts'}
              </Link>
            </div>
        </div>
    </div>
  );
};

export default BlogPreview;
