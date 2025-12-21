import { getServiceData, getAllServiceSlugs } from '@/lib/services';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import ServicePageLayout from '@/app/components/layout/ServicePageLayout';
import FAQ from '@/app/components/blocks/FAQ';
import RelatedPosts from '@/app/components/blocks/RelatedPosts';
import FeatureList from '@/app/components/blocks/FeatureList';
import StatsGrid from '@/app/components/blocks/StatsGrid';
import ServiceCardGrid from '@/app/components/blocks/ServiceCardGrid';
import ProcessSteps from '@/app/components/blocks/ProcessSteps';
import MDXContent from '@/app/components/mdx/MDXContent';
import JsonLd, { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/app/components/common/JsonLd';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

const componentsMap: { [key: string]: React.ComponentType<any> } = {
  FeatureList,
  StatsGrid,
  ServiceCardGrid,
  ProcessSteps,
  MdxContent: MDXContent,
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
  
  let serviceData;
  try {
    serviceData = await getServiceData(resolvedParams.lang, resolvedParams.slug);
  } catch (error) {
    notFound();
  }
  
  const {
    frontmatter,
    contentBlocks,
    faqData,
  } = serviceData;

  return (
    <>
      <ServicePageLayout title={frontmatter.title} description={frontmatter.description} category={frontmatter.category}>
        {contentBlocks.map((block: any, index: number) => {
          // Handle MdxContent blocks differently - they have 'source' instead of 'data'
          if (block.type === 'MdxContent') {
            const Component = componentsMap[block.type];
            if (Component) {
              const paddingClasses = index === 0 ? 'pt-16 sm:pt-24 pb-24 sm:pb-32' : 'py-24 sm:py-32';
              return (
                <div key={index} className={`bg-white dark:bg-gray-900 ${paddingClasses}`}>
                  <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="space-y-6">
                      <Component source={block.source} />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }

          // Handle other block types (FeatureList, StatsGrid, etc.)
          const Component = componentsMap[block.type];
          if (Component) {
            const componentProps: { [key: string]: any } = {
              ...block.data,
              category: frontmatter.category,
              padding: index === 0 ? 'top-compact' : 'default',
            };

            return <Component key={index} {...componentProps} />;
          }
          return null;
        })}
      </ServicePageLayout>
      {faqData && <FAQ {...faqData} category={frontmatter.category} ctaText={frontmatter.faqCtaText} ctaButtonText={frontmatter.faqCtaButtonText} />}
      <RelatedPosts 
        lang={resolvedParams.lang} 
        category={frontmatter.category} 
        currentTitle={frontmatter.title}
        currentExcerpt={frontmatter.description}
      />
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
            // Regional SEO targeting for Spain, Germany, and UK
            areaServed: [
              { '@type': 'Country', name: 'Spain' },
              { '@type': 'Country', name: 'Germany' },
              { '@type': 'Country', name: 'United Kingdom' },
            ],
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
