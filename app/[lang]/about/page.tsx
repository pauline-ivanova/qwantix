import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import Hero from '@/app/components/blocks/Hero';
import FeatureList from '@/app/components/blocks/FeatureList';
import CTA from '@/app/components/blocks/CTA';
import ContactUs from '@/app/components/blocks/ContactUs';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import {
  MagnifyingGlassIcon,
  RectangleGroupIcon,
  ScaleIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  PresentationChartLineIcon,
  CheckBadgeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const dict: any = await getDictionary(lang as any);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/about`;

  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/about`);

  return {
    ...generateStandardMetadata({
      title: dict.about.meta.title,
      description: dict.about.meta.description,
      url: currentUrl,
      pagePath: `/${lang}/about`,
      language: lang,
      alternateLanguages,
    }),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const dict: any = await getDictionary(lang as any);

  const principlesIcons = [
    MagnifyingGlassIcon,
    RectangleGroupIcon,
    ScaleIcon,
    ShieldCheckIcon,
  ];

  const workIcons = [
    GlobeAltIcon,
    PresentationChartLineIcon,
    CommandLineIcon,
    ShieldCheckIcon,
    RectangleGroupIcon,
    GlobeAltIcon,
  ];

  const backgroundIcons = [
    ScaleIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    BriefcaseIcon,
  ];

  return (
    <>
      <section id="hero">
        <Hero
          title={dict.about.hero.title}
          subtitle={dict.about.hero.subtitle}
          buttonText={dict.about.hero.buttonText}
        />
      </section>

      <section id="principles">
        <FeatureList
          title={dict.about.principles.title}
          description={dict.about.principles.description}
          features={dict.about.principles.items.map((item: any, idx: number) => ({
            ...item,
            icon: principlesIcons[idx % principlesIcons.length],
          }))}
        />
      </section>

      <section id="work" className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{dict.about.work.title}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {dict.about.work.description}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {dict.about.work.items.map((item: string, idx: number) => {
                const Icon = workIcons[idx % workIcons.length];
                return (
                  <div key={item} className="flex flex-col">
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <span className="leading-tight">{item}</span>
                    </dt>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      <section id="consultant">
        <FeatureList
          title={dict.about.consultant.title}
          description={dict.about.consultant.description}
          features={dict.about.consultant.background.map((item: string, idx: number) => ({
            name: item,
            description: "",
            icon: backgroundIcons[idx % backgroundIcons.length],
          }))}
        />
      </section>

      <section id="how-we-work" className="bg-white dark:bg-gray-900 py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
                <SparklesIcon className="w-4 h-4" />
                <span>{dict.about.howWeWork.eyebrow}</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">
                {dict.about.howWeWork.title}
              </h2>
              <p className="text-xl leading-9 text-gray-600 dark:text-gray-300 mb-10">
                {dict.about.howWeWork.description}
              </p>
              <div className="p-8 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
                <p className="text-lg font-medium leading-8">
                  {dict.about.howWeWork.additionalInfo}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                {dict.about.howWeWork.itemsTitle}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {dict.about.howWeWork.items.map((item: string, idx: number) => (
                  <div 
                    key={item} 
                    className="group relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <CheckBadgeIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta">
        <CTA lang={lang} />
      </section>

      <section id="contact-us">
        <ContactUs lang={lang} />
      </section>
    </>
  );
}

