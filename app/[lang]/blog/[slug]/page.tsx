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
import MarkdownContent from '@/app/components/mdx/MarkdownContent';
import RelatedPosts from '@/app/components/blocks/RelatedPosts';
import FunnelCTA from '@/app/components/blocks/FunnelCTA';
import { calculateReadingTime, formatReadingTime } from '@/lib/content-utils';
import { findRelatedContent, extractKeywords } from '@/lib/internal-linking';
import { getAuthor } from '@/lib/authors';
import Link from 'next/link';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

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

// Fixed date for all metadata: December 21, 2025
const FIXED_DATE = new Date('2025-12-21T12:00:00Z');

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
    lastModified: FIXED_DATE,
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

  const baseMetadata = generateStandardMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.frontmatter.title,
    url: currentUrl,
    pagePath: `/${lang}/blog/${slug}`,
    keywords: [post.frontmatter.category || 'digital marketing', 'SEO', 'blog'],
    language: lang,
    alternateLanguages,
    image: ogImageUrl, // Use dynamic OG image
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      types: {
        'application/rss+xml': [
          { url: `${baseUrl}/${lang}/feed.xml`, title: 'RSS Feed' },
        ],
      },
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ lang: string, slug: string }> | { lang: string, slug: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang, slug } = resolvedParams;
  const post = getPost(lang, slug);

  if (!post) {
    notFound();
  }

  // Get author - use default author (Polina Ivanova) if not specified
  const authorSlug = post.frontmatter.author || 'polina-ivanova';
  const author = getAuthor(authorSlug);

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
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className={`text-base font-semibold leading-7 ${getCategoryTextColor(category)}`}>{post.frontmatter.category}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl" suppressHydrationWarning>{post.frontmatter.title}</h1>
            <p className={`mt-6 text-lg leading-8 ${getCategoryTextLight(category)}`}>{post.frontmatter.excerpt}</p>
            
            {/* Article Meta: Reading Time, Date & Author */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/70">
              <span className="font-medium">{formatReadingTime(calculateReadingTime(post.content), lang)}</span>
              {post.lastModified && (
                <>
                  <span className="text-white/40">·</span>
                  <span>
                    {new Date(post.lastModified).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'ru-RU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </>
              )}
              {author && (
                <>
                  <span className="text-white/40">·</span>
                  <Link 
                    href={`/${lang}/author/${author.slug}`}
                    className="hover:text-white/90 transition-colors"
                  >
                    {lang === 'es' && 'Por '}
                    {lang === 'de' && 'Von '}
                    {lang === 'ru' && 'Автор: '}
                    {lang === 'en' && 'By '}
                    {author.name}
                  </Link>
                </>
              )}
            </div>
          </div>
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

          {/* Author Section */}
          {author && (
            <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                      {author.name}
                    </div>
                    <Link
                      href={`/${lang}/author/${author.slug}`}
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      {lang === 'es' && 'Ver perfil'}
                      {lang === 'de' && 'Profil ansehen'}
                      {lang === 'ru' && 'Посмотреть профиль'}
                      {lang === 'en' && 'View profile'}
                      <span className="ml-1">→</span>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {author.jobTitle}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {author.bio.split('\n\n')[0]}
                  </p>
                  {(author.socialLinks.linkedin || author.socialLinks.upwork) && (
                    <div className="flex gap-3 mt-4">
                      {author.socialLinks.linkedin && (
                        <a
                          href={author.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {author.socialLinks.upwork && (
                        <a
                          href={author.socialLinks.upwork}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="Upwork"
                        >
                          <BriefcaseIcon className="w-4 h-4" />
                          Upwork
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Posts - Enhanced with topic clustering */}
      <RelatedPosts 
        lang={lang} 
        category={category} 
        currentSlug={slug}
        currentTitle={post.frontmatter.title}
        currentExcerpt={post.frontmatter.excerpt || ''}
      />
      
      {/* JSON-LD Schema */}
      <JsonLd
        data={[
          generateArticleSchema({
            headline: post.frontmatter.title,
            description: post.frontmatter.excerpt || post.frontmatter.title,
            author: (() => {
              // Use author from frontmatter if available, otherwise default to Polina Ivanova
              const authorSlug = post.frontmatter.author || 'polina-ivanova';
              const authorData = getAuthor(authorSlug);
              if (authorData) {
                return {
                  name: authorData.name,
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'}/${lang}/author/${authorData.slug}`,
                  type: 'Person' as const,
                };
              }
              // Fallback to Qwantix Agency if author not found
              return {
                name: 'Qwantix Agency',
                url: process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com',
                type: 'Organization' as const,
              };
            })(),
            datePublished: FIXED_DATE.toISOString(),
            dateModified: FIXED_DATE.toISOString(),
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
