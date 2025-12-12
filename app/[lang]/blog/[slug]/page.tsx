import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

function getPost(lang: string, slug: string) {
  const langDirectory = path.join(postsDirectory, lang);
  const fullPath = path.join(langDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content: content,
  };
}


export default function PostPage({ params: { lang, slug } }: { params: { lang: string, slug: string } }) {
  const post = getPost(lang, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-base font-semibold leading-7 text-indigo-300">{post.frontmatter.category}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">{post.frontmatter.title}</h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100">{post.frontmatter.excerpt}</p>
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

      <div className="bg-white">
        <div className="prose prose-lg mx-auto py-16 px-6 lg:px-8">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const { locales } = i18n;
  const paths: { lang: string, slug: string }[] = [];

  for (const lang of locales) {
    const posts = getAllPosts(lang);
    for (const post of posts) {
      paths.push({
        lang: lang,
        slug: post.slug,
      });
    }
  }

  return paths;
}
