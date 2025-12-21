import { Metadata } from 'next';
import { CpuChipIcon, ShieldCheckIcon, EyeIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { i18n } from '@/i18n.config';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  
  const titles = {
    en: 'AI Usage Policy | Qwantix Agency',
    es: 'Política de Uso de IA | Qwantix Agency',
    de: 'KI-Nutzungsrichtlinie | Qwantix Agency',
    ru: 'Политика использования ИИ | Qwantix Agency',
  };
  
  const descriptions = {
    en: 'Transparency about how we use AI at Qwantix Agency. Our commitment to ethical AI and data privacy.',
    es: 'Transparencia sobre cómo utilizamos la IA en Qwantix Agency. Nuestro compromiso con la IA ética y la privacidad de los datos.',
    de: 'Transparenz darüber, wie wir KI bei Qwantix Agency einsetzen. Unser Engagement für ethische KI und Datenschutz.',
    ru: 'Прозрачность использования ИИ в Qwantix Agency. Наши обязательства по этичному ИИ и защите данных.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/ai-policy`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/ai-policy`);

  return {
    ...generateStandardMetadata({
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: currentUrl,
      pagePath: `/${lang}/ai-policy`,
      keywords: ['AI policy', 'ethical AI', 'artificial intelligence', 'data transparency'],
      language: lang,
      alternateLanguages,
      image: '/images/og-image.jpg',
    }),
  };
}

const content = {
  en: {
    title: 'AI Usage Policy',
    lastUpdated: 'Last updated',
    intro: 'At Qwantix Agency, we leverage Artificial Intelligence to enhance our digital marketing services while maintaining the highest standards of ethics, transparency, and data privacy.',
    sections: [
      {
        title: 'How We Use AI',
        icon: CpuChipIcon,
        content: [
          'Content Assistance: We use AI to help brainstorm ideas, structure content, and optimize copy for SEO. All final content is reviewed and edited by human experts.',
          'Data Analysis: AI tools help us process large volumes of marketing data to identify trends and opportunities for our clients.',
          'Workflow Optimization: We use AI to automate repetitive tasks, allowing our team to focus on strategic and creative work.',
        ],
      },
      {
        title: 'Ethical Standards',
        icon: ShieldCheckIcon,
        content: [
          'Human-in-the-Loop: No AI-generated output is published or implemented without human oversight and verification.',
          'Bias Mitigation: We actively work to identify and mitigate biases in the AI tools we use.',
          'Transparency: We are open with our clients about where and how AI is used in their projects.',
        ],
      },
      {
        title: 'Data Privacy',
        icon: EyeIcon,
        content: [
          'Confidentiality: We never input sensitive client data into public AI models.',
          'Security: We use enterprise-grade AI tools with strict data protection policies.',
          'Ownership: Our clients retain ownership of the final deliverables, regardless of the tools used to create them.',
        ],
      },
    ],
  },
  // Add other languages as needed or use a simplified version for now
};

export default async function AIPolicyPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const currentLang = i18n.locales.includes(lang as any) ? lang : 'en';
  const contentLang = content[currentLang as keyof typeof content] || content.en;
  const currentDate = new Date('2025-12-21T12:00:00Z');
  const lastUpdated = currentDate.toLocaleDateString(
    currentLang === 'es' ? 'es-ES' : currentLang === 'de' ? 'de-DE' : currentLang === 'ru' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <>
      <div className="relative isolate bg-gradient-to-b from-indigo-600 to-indigo-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {contentLang.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            {contentLang.lastUpdated}: {lastUpdated}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20" style={{ transform: 'translateY(1px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-12">
            {contentLang.intro}
          </p>

          {contentLang.sections.map((section, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-3">
                <section.icon className="w-8 h-8 text-indigo-600" />
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          
          <section className="bg-indigo-50 rounded-2xl p-8 mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-900 flex items-center gap-3">
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-indigo-600" />
              Questions?
            </h2>
            <p className="text-indigo-800">
              If you have any questions about our use of AI or our data protection practices, please contact us at{' '}
              <a href="mailto:info@qwantix.agency" className="font-semibold underline hover:text-indigo-700">
                info@qwantix.agency
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
