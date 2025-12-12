import { getServiceData, getAllServiceSlugs } from '@/lib/services';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ServicePageLayout from '@/app/components/layout/ServicePageLayout';
import FAQ from '@/app/components/blocks/FAQ';
import RelatedPosts from '@/app/components/blocks/RelatedPosts';
import FeatureList from '@/app/components/blocks/FeatureList';
import StatsGrid from '@/app/components/blocks/StatsGrid';
import ServiceCardGrid from '@/app/components/blocks/ServiceCardGrid';
import ProcessSteps from '@/app/components/blocks/ProcessSteps';
import JsonLd, { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/app/components/common/JsonLd';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import TableOfContents from '@/app/components/blocks/TableOfContents';
import { parseTableOfContents } from '@/lib/toc-parser';

const componentsMap: { [key: string]: React.ComponentType<any> } = {
  FeatureList,
  StatsGrid,
  ServiceCardGrid,
  ProcessSteps,
};

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  const paths = getAllServiceSlugs();
  return paths;
}

export async function generateMetadata({ params }: { params: Promise<Props['params']> | Props['params'] }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { frontmatter } = await getServiceData(resolvedParams.lang, resolvedParams.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${resolvedParams.lang}/services/${resolvedParams.slug}`;
  const alternateLanguages = generateAlternateLanguages(resolvedParams.lang, `/${resolvedParams.lang}/services/${resolvedParams.slug}`);
  const ogImageUrl = `${baseUrl}/api/og/service/${resolvedParams.slug}?lang=${resolvedParams.lang}`;

  return {
    ...generateStandardMetadata({
      title: frontmatter.title,
      description: frontmatter.description,
      url: currentUrl,
      pagePath: `/${resolvedParams.lang}/services/${resolvedParams.slug}`,
      keywords: [frontmatter.category, 'digital marketing', 'SEO', 'PPC', 'social media marketing'],
      language: resolvedParams.lang,
      alternateLanguages,
      image: ogImageUrl, // Use dynamic OG image
    }),
  };
}

export default async function ServicePage({ params }: { params: Promise<Props['params']> | Props['params'] }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const {
    frontmatter,
    contentBlocks,
    faqData,
    rawContent
  } = await getServiceData(resolvedParams.lang, resolvedParams.slug);

  // Parse TOC from raw content
  const tocItems = rawContent ? parseTableOfContents(rawContent) : [];

  return (
    <>
      <ServicePageLayout title={frontmatter.title} description={frontmatter.description} category={frontmatter.category}>
        {/* Table of Contents */}
        {tocItems.length > 0 && (
          <TableOfContents items={tocItems} category={frontmatter.category} />
        )}
        {contentBlocks.map((block: any, index: number) => {
          const Component = componentsMap[block.type];
          if (Component) {
            const componentProps: { [key: string]: any } = {
              ...block.data,
              padding: index === 0 ? 'top-compact' : 'default',
            };

            return <Component key={index} {...componentProps} />;
          }
          return null;
        })}
      </ServicePageLayout>
      {faqData && <FAQ {...faqData} ctaText={frontmatter.faqCtaText} ctaButtonText={frontmatter.faqCtaButtonText} />}
      <RelatedPosts lang={resolvedParams.lang} category={frontmatter.category} />
      {/* JSON-LD Schema */}
      <JsonLd
        data={[
          generateServiceSchema({
            name: frontmatter.title,
            description: frontmatter.description,
            provider: {
              '@type': 'Organization',
              name: 'Qwantix Agency',
            },
            serviceType: frontmatter.category,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'}/${resolvedParams.lang}/services/${resolvedParams.slug}`,
          }),
          generateBreadcrumbSchema([
            { name: 'Home', url: `/${resolvedParams.lang}` },
            { name: 'Services', url: `/${resolvedParams.lang}/services` },
            { name: frontmatter.title, url: `/${resolvedParams.lang}/services/${resolvedParams.slug}` },
          ]),
          ...(faqData && faqData.faqs ? [generateFAQSchema(faqData.faqs.map(faq => ({
            question: faq.question,
            answer: faq.answer,
          })))] : []),
        ].filter(Boolean)}
      />
    </>
  );
}
