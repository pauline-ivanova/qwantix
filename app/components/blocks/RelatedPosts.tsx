import Link from 'next/link';
import { getPostsByCategory } from '@/lib/posts';

interface RelatedPostsProps {
  lang: string;
  category: string;
}

const categoryColors: { [key:string]: string } = {
  'SEO': 'bg-indigo-100 text-indigo-800',
  'PPC': 'bg-green-100 text-green-800',
};

const RelatedPosts = ({ lang, category }: RelatedPostsProps) => {
  const relatedPosts = getPostsByCategory(lang, category).slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Further Reading on {category}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our blog for more expert insights, tips, and strategies on {category}.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <article key={post.slug} className="flex flex-col items-start self-start">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"></div>
              </div>
              <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-sm">
                      <div className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                          {post.category}
                      </div>
                  </div>
                  <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <Link href={`/blog/${post.slug}`}>
                              <span className="absolute inset-0" />
                              {post.title}
                          </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                  </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
