import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

const categoryColors: { [key: string]: string } = {
  'SEO': 'bg-indigo-100 text-indigo-800',
  'PPC': 'bg-green-100 text-green-800',
  'Content': 'bg-pink-100 text-pink-800',
};

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const allPosts = getAllPosts(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';

  return (
    <>
      <div className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Qwantix Blog</h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Expert insights, tips, and strategies. Your go-to resource for the latest trends and best practices in digital marketing.
            </p>
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
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allPosts.map((post) => {
              const colorClasses = categoryColors[post.category] || 'bg-gray-100 text-gray-800';
              return (
                <article key={post.slug} className="flex flex-col items-start self-start">
                  <div className="relative w-full">
                    <Link href={`/${lang}/blog/${post.slug}`}>
                      <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden relative">
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
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={`/${lang}/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
