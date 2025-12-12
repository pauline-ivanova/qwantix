import { getServiceData, getAllServiceSlugs } from '@/lib/services';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ServicePageLayout from '@/app/components/layout/ServicePageLayout';
import FAQ from '@/app/components/blocks/FAQ';
import RelatedPosts from '@/app/components/blocks/RelatedPosts';
import FeatureList from '@/app/components/blocks/FeatureList';
import StatsGrid from '@/app/components/blocks/StatsGrid';
import ServiceCardGrid from '@/app/components/blocks/ServiceCardGrid';
import ProcessSteps from '@/app/components/blocks/ProcessSteps';

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

export async function generateMetadata({ params }: Props) {
  const { frontmatter } = await getServiceData(params.lang, params.slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const {
    frontmatter,
    contentBlocks,
    faqData
  } = await getServiceData(params.lang, params.slug);

  return (
    <>
      <ServicePageLayout title={frontmatter.title} description={frontmatter.description} category={frontmatter.category}>
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
      <RelatedPosts lang={params.lang} category={frontmatter.category} />
    </>
  );
}
