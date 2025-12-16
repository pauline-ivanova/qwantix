import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { i18n } from '@/i18n.config';
import JsonLd, { generateArticleSchema, generateBreadcrumbSchema } from '@/app/components/common/JsonLd';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import { Metadata } from 'next';
import TableOfContents from '@/app/components/blocks/TableOfContents';
import { parseTableOfContents } from '@/lib/toc-parser';
import { resetHeadingIdTracker } from '@/app/components/mdx/CustomComponents';
import MarkdownContent from '@/app/components/mdx/MarkdownContent';
import RelatedPosts from '@/app/components/blocks/RelatedPosts';
import FunnelCTA from '@/app/components/blocks/FunnelCTA';

// Category gradient colors matching the color scheme
function getCategoryGradient(category: string): { from: string; to: string; radial: string } {
  const gradients: Record<string, { from: string; to: string; radial: string }> = {
    'SEO': {
      from: 'from-[#4f46e5]',
      to: 'to-indigo-800',
      radial: 'rgba(79, 70, 229, 0.4)', // indigo-600 with opacity
    },
    'PPC': {
      from: 'from-[#db2777]',
      to: 'to-pink-800',
      radial: 'rgba(219, 39, 119, 0.4)', // pink-600 with opacity
    },
    'Social Media Marketing': {
      from: 'from-[#ea580c]',
      to: 'to-orange-800',
      radial: 'rgba(234, 88, 12, 0.4)', // orange-600 with opacity
    },
    'SMM': {
      from: 'from-[#ea580c]',
      to: 'to-orange-800',
      radial: 'rgba(234, 88, 12, 0.4)', // orange-600 with opacity
    },
    'Content Creation': {
      from: 'from-[#0891b2]',
      to: 'to-cyan-800',
      radial: 'rgba(8, 145, 178, 0.4)', // cyan-600 with opacity
    },
    'Content': {
      from: 'from-[#0891b2]',
      to: 'to-cyan-800',
      radial: 'rgba(8, 145, 178, 0.4)', // cyan-600 with opacity
    },
  };

  return gradients[category] || {
    from: 'from-[#635bff]',
    to: 'to-indigo-800',
    radial: 'rgba(30, 27, 75, 0.4)', // default
  };
}

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

  // Reset heading ID tracker before parsing TOC and rendering content
  resetHeadingIdTracker();
  
  // Parse TOC from content
  const tocItems = parseTableOfContents(post.content);
  
  // Get category-specific gradient colors
  const category = post.frontmatter.category || 'SEO';
  const gradient = getCategoryGradient(category);
  
  // Get text color based on category (lighter shade for better contrast)
  const getCategoryTextColor = (cat: string): string => {
    const colors: Record<string, string> = {
      'SEO': 'text-indigo-300',
      'PPC': 'text-pink-300',
      'Social Media Marketing': 'text-orange-300',
      'SMM': 'text-orange-300',
      'Content Creation': 'text-cyan-300',
      'Content': 'text-cyan-300',
    };
    return colors[cat] || 'text-indigo-300';
  };
  
  const getCategoryTextLight = (cat: string): string => {
    const colors: Record<string, string> = {
      'SEO': 'text-indigo-100',
      'PPC': 'text-pink-100',
      'Social Media Marketing': 'text-orange-100',
      'SMM': 'text-orange-100',
      'Content Creation': 'text-cyan-100',
      'Content': 'text-cyan-100',
    };
    return colors[cat] || 'text-indigo-100';
  };

  return (
    <>
      <div className={`relative isolate bg-gradient-to-b ${gradient.from} ${gradient.to} py-24 sm:py-32`}>
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `radial-gradient(circle at top left, ${gradient.radial}, transparent 50%)` 
          }} 
        />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className={`text-base font-semibold leading-7 ${getCategoryTextColor(category)}`}>{post.frontmatter.category}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl" suppressHydrationWarning>{post.frontmatter.title}</h1>
          <p className={`mt-6 text-lg leading-8 ${getCategoryTextLight(category)}`}>{post.frontmatter.excerpt}</p>
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
            <MarkdownContent 
              content={post.content}
              insertBeforeThirdH2={
                <FunnelCTA
                  lang={lang}
                  category={category}
                  currentSlug={slug}
                  currentTitle={post.frontmatter.title}
                />
              }
            />
          </div>
        </div>
      </div>
      
      {/* Related Posts */}
      <RelatedPosts 
        lang={lang} 
        category={category} 
        currentSlug={slug}
      />
      
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
