import { Metadata } from 'next';
import { UserIcon, ChatBubbleBottomCenterTextIcon, SpeakerWaveIcon, EyeIcon } from '@heroicons/react/24/outline';
import { i18n } from '@/i18n.config';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  
  const titles = {
    en: 'Accessibility Statement | Qwantix Agency',
    es: 'Declaración de Accesibilidad | Qwantix Agency',
    de: 'Erklärung zur Barrierefreiheit | Qwantix Agency',
    ru: 'Заявление о доступности | Qwantix Agency',
  };
  
  const descriptions = {
    en: 'Our commitment to ensuring digital accessibility for people with disabilities.',
    es: 'Nuestro compromiso para garantizar la accesibilidad digital de las personas con discapacidad.',
    de: 'Unser Engagement für die Gewährleistung der digitalen Barrierefreiheit für Menschen mit Behinderungen.',
    ru: 'Наше обязательство по обеспечению цифровой доступности для людей с ограниченными возможностями.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/accessibility`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/accessibility`);

  return {
    ...generateStandardMetadata({
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: currentUrl,
      pagePath: `/${lang}/accessibility`,
      keywords: ['accessibility', 'WCAG', 'digital inclusion', 'disability rights'],
      language: lang,
      alternateLanguages,
      image: '/images/og-image.jpg',
      robots: {
        index: true,
        follow: true,
      },
    }),
  };
}

const content = {
  en: {
    title: 'Accessibility Statement',
    subtitle: 'Our commitment to digital inclusion',
    intro: 'Qwantix Agency is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.',
    measures: {
      title: 'Measures to Support Accessibility',
      items: [
        'Integrating accessibility into our procurement practices.',
        'Assigning clear accessibility goals and responsibilities.',
        'Employing formal accessibility quality assurance methods.'
      ]
    },
    status: {
      title: 'Conformance Status',
      text: 'The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. Qwantix Agency is partially conformant with WCAG 2.1 level AA.'
    },
    feedback: {
      title: 'Feedback',
      text: 'We welcome your feedback on the accessibility of Qwantix Agency. Please let us know if you encounter accessibility barriers:',
      contact: [
        'Contact Person: Polina Ivanova',
        'Email: info@qwantix.agency',
        'Response Time: We try to respond to feedback within 3 business days.'
      ]
    }
  },
  de: {
    title: 'Erklärung zur Barrierefreiheit',
    subtitle: 'Unser Engagement für digitale Inklusion',
    intro: 'Qwantix Agency setzt sich dafür ein, die digitale Barrierefreiheit für Menschen mit Behinderungen zu gewährleisten. Wir verbessern kontinuierlich die Benutzererfahrung für alle und wenden die relevanten Barrierefreiheitsstandards an.',
    measures: {
      title: 'Maßnahmen zur Unterstützung der Barrierefreiheit',
      items: [
        'Integration der Barrierefreiheit in unsere Beschaffungspraktiken.',
        'Festlegung klarer Ziele und Verantwortlichkeiten für die Barrierefreiheit.',
        'Einsatz formaler Methoden zur Qualitätssicherung der Barrierefreiheit.'
      ]
    },
    status: {
      title: 'Konformitätsstatus',
      text: 'Die Web Content Accessibility Guidelines (WCAG) definieren Anforderungen für Designer und Entwickler, um die Barrierefreiheit für Menschen mit Behinderungen zu verbessern. Qwantix Agency ist teilweise konform mit WCAG 2.1 Ebene AA.'
    },
    feedback: {
      title: 'Feedback',
      text: 'Wir freuen uns über Ihr Feedback zur Barrierefreiheit von Qwantix Agency. Bitte lassen Sie uns wissen, wenn Sie auf Barrieren stoßen:',
      contact: [
        'Ansprechpartner: Polina Ivanova',
        'E-Mail: info@qwantix.agency',
        'Antwortzeit: Wir bemühen uns, innerhalb von 3 Werktagen auf Feedback zu antworten.'
      ]
    }
  },
  es: {
    title: 'Declaración de Accesibilidad',
    subtitle: 'Nuestro compromiso con la inclusión digital',
    intro: 'Qwantix Agency se compromete a garantizar la accesibilidad digital de las personas con discapacidad. Mejoramos continuamente la experiencia del usuario para todos y aplicamos los estándares de accesibilidad pertinentes.',
    measures: {
      title: 'Medidas para apoyar la accesibilidad',
      items: [
        'Integrar la accesibilidad en nuestras prácticas de contratación.',
        'Asignar objetivos y responsabilidades claros en materia de accesibilidad.',
        'Emplear métodos formales de garantía de calidad de la accesibilidad.'
      ]
    },
    status: {
      title: 'Estado de conformidad',
      text: 'Las Pautas de Accesibilidad al Contenido Web (WCAG) definen los requisitos para que los diseñadores y desarrolladores mejoren la accesibilidad de las personas con discapacidad. Qwantix Agency cumple parcialmente con el nivel AA de las WCAG 2.1.'
    },
    feedback: {
      title: 'Comentarios',
      text: 'Agradecemos sus comentarios sobre la accesibilidad de Qwantix Agency. Háganos saber si encuentra barreras de accesibilidad:',
      contact: [
        'Persona de contacto: Polina Ivanova',
        'Email: info@qwantix.agency',
        'Tiempo de respuesta: Intentamos responder a los comentarios en un plazo de 3 días hábiles.'
      ]
    }
  },
  ru: {
    title: 'Заявление о доступности',
    subtitle: 'Наше обязательство по цифровой инклюзии',
    intro: 'Qwantix Agency стремится обеспечить цифровую доступность для людей с ограниченными возможностями. Мы постоянно улучшаем пользовательский опыт для всех и применяем соответствующие стандарты доступности.',
    measures: {
      title: 'Меры по поддержке доступности',
      items: [
        'Интеграция доступности в наши практики закупок.',
        'Постановка четких целей и распределение ответственности за доступность.',
        'Использование формальных методов обеспечения качества доступности.'
      ]
    },
    status: {
      title: 'Статус соответствия',
      text: 'Руководство по обеспечению доступности веб-контента (WCAG) определяет требования к дизайнерам и разработчикам для улучшения доступности для людей с ограниченными возможностями. Qwantix Agency частично соответствует уровню AA стандарта WCAG 2.1.'
    },
    feedback: {
      title: 'Обратная связь',
      text: 'Мы приветствуем ваши отзывы о доступности Qwantix Agency. Пожалуйста, сообщите нам, если вы столкнетесь с препятствиями при использовании сайта:',
      contact: [
        'Контактное лицо: Полина Иванова',
        'Email: info@qwantix.agency',
        'Время ответа: Мы стараемся отвечать на отзывы в течение 3 рабочих дней.'
      ]
    }
  }
};

export default async function AccessibilityPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const currentLang = i18n.locales.includes(lang as any) ? lang : 'en';
  const contentLang = content[currentLang as keyof typeof content] || content.en;

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {contentLang.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            {contentLang.subtitle}
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

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-12 border-l-4 border-indigo-600 pl-6 py-2">
            {contentLang.intro}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
              <SpeakerWaveIcon className="w-6 h-6 text-indigo-600" />
              {contentLang.measures.title}
            </h2>
            <ul className="space-y-3">
              {contentLang.measures.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
              <EyeIcon className="w-6 h-6 text-indigo-600" />
              {contentLang.status.title}
            </h2>
            <p className="text-gray-700">{contentLang.status.text}</p>
          </section>

          <section className="mb-12 bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-900 flex items-center gap-2">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
              {contentLang.feedback.title}
            </h2>
            <p className="text-indigo-800 mb-6">{contentLang.feedback.text}</p>
            <ul className="space-y-2">
              {contentLang.feedback.contact.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-indigo-900 font-medium">
                  {idx === 0 && <UserIcon className="w-5 h-5 opacity-70" />}
                  {idx === 1 && <ChatBubbleBottomCenterTextIcon className="w-5 h-5 opacity-70" />}
                  {item.includes('@') ? (
                    <>
                      {item.split(': ')[0]}:{' '}
                      <a href={`mailto:${item.split(': ')[1]}`} className="underline hover:text-indigo-700 transition-colors">
                        {item.split(': ')[1]}
                      </a>
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
