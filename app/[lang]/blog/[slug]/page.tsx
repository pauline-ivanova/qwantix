import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';
import JsonLd, { generateArticleSchema, generateBreadcrumbSchema } from '@/app/components/common/JsonLd';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import { Metadata } from 'next';
import TableOfContents from '@/app/components/blocks/TableOfContents';
import { parseTableOfContents } from '@/lib/toc-parser';

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

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> | { lang: string, slug: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang, slug } = resolvedParams;
  const post = getPost(lang, slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/blog/${slug}`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/blog/${slug}`);
  const ogImageUrl = `${baseUrl}/api/og/blog/${slug}?lang=${lang}`;

  return {
    ...generateStandardMetadata({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt || post.frontmatter.title,
      url: currentUrl,
      pagePath: `/${lang}/blog/${slug}`,
      keywords: [post.frontmatter.category || 'digital marketing', 'SEO', 'blog'],
      language: lang,
      alternateLanguages,
      image: ogImageUrl, // Use dynamic OG image
    }),
  };
}

export default async function PostPage({ params }: { params: Promise<{ lang: string, slug: string }> | { lang: string, slug: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang, slug } = resolvedParams;
  const post = getPost(lang, slug);

  if (!post) {
    notFound();
  }

  // Parse TOC from content
  const tocItems = parseTableOfContents(post.content);

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

      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <TableOfContents items={tocItems} category={post.frontmatter.category || 'SEO'} />
          )}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </div>
      {/* JSON-LD Schema */}
      <JsonLd
        data={[
          generateArticleSchema({
            headline: post.frontmatter.title,
            description: post.frontmatter.excerpt || post.frontmatter.title,
            author: {
              name: 'Qwantix Agency',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com',
            },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'}/${lang}/blog/${slug}`,
            publisher: {
              name: 'Qwantix Agency',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'}/images/qwantix-logo.svg`,
            },
          }),
          generateBreadcrumbSchema([
            { name: 'Home', url: `/${lang}` },
            { name: 'Blog', url: `/${lang}/blog` },
            { name: post.frontmatter.title, url: `/${lang}/blog/${slug}` },
          ]),
        ]}
      />
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
