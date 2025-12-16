'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
};

interface BlogFilterProps {
  posts: Post[];
  lang: string;
}

const categoryColors: { [key: string]: string } = {
  'SEO': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
  'PPC': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
  'Content': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
  'Content Creation': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
  'Social Media Marketing': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
  'SMM': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
};

export default function BlogFilter({ posts, lang }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map(p => p.category)));
    return ['All', ...uniqueCategories.sort()];
  }, [posts]);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return posts;
    }
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    // Scroll to top of posts section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-4" suppressHydrationWarning>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            suppressHydrationWarning
          >
            {lang === 'es' && category === 'All' 
              ? 'Todas' 
              : lang === 'de' && category === 'All' 
              ? 'Alle' 
              : lang === 'ru' && category === 'All' 
              ? 'Все' 
              : category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3" suppressHydrationWarning>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
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
          })
        ) : (
          <div className="col-span-3 mx-auto mt-12 max-w-2xl text-center text-gray-600 dark:text-gray-300">
            {lang === 'es' 
              ? 'No hay artículos disponibles en esta categoría.' 
              : lang === 'de' 
              ? 'Keine Artikel in dieser Kategorie verfügbar.' 
              : lang === 'ru' 
              ? 'В этой категории пока нет статей.' 
              : 'No posts available in this category.'}
          </div>
        )}
      </div>
    </>
  );
}
