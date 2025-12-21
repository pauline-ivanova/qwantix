import { Metadata } from 'next';
import { InformationCircleIcon, MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { i18n } from '@/i18n.config';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  
  const titles = {
    en: 'Legal Notice (Impressum) | Qwantix Agency',
    es: 'Aviso Legal | Qwantix Agency',
    de: 'Impressum | Qwantix Agency',
    ru: 'Правовая информация (Impressum) | Qwantix Agency',
  };
  
  const descriptions = {
    en: 'Legal information and contact details of Qwantix Agency, represented by Polina Ivanova.',
    es: 'Información legal y datos de contacto de Qwantix Agency, representada por Polina Ivanova.',
    de: 'Rechtliche Informationen und Kontaktdaten von Qwantix Agency, vertreten durch Polina Ivanova.',
    ru: 'Юридическая информация и контактные данные Qwantix Agency в лице Полины Ивановой.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/impressum`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/impressum`);

  return {
    ...generateStandardMetadata({
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: currentUrl,
      pagePath: `/${lang}/impressum`,
      keywords: ['impressum', 'legal notice', 'contact', 'company information'],
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
    title: 'Legal Notice (Impressum)',
    subtitle: 'Information according to legal requirements',
    companyInfo: {
      title: 'Company Information',
      name: 'Polina Ivanova (Sole Trader)',
      tradingAs: 'Trading as Qwantix Agency',
      address: '3F Commutation Plaza, London Road, Liverpool L3 8HR, United Kingdom',
      taxId: 'UTR: 5927656622',
    },
    contact: {
      title: 'Contact Details',
      email: 'Email: info@qwantix.agency',
      phone: 'Phone: +44 79 1832 9441',
    },
    responsible: {
      title: 'Responsible for Content',
      text: 'Polina Ivanova, 3F Commutation Plaza, London Road, Liverpool L3 8HR, United Kingdom',
    },
    dispute: {
      title: 'Dispute Resolution',
      text: 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
    }
  },
  de: {
    title: 'Impressum',
    subtitle: 'Angaben gemäß gesetzlichen Anforderungen',
    companyInfo: {
      title: 'Unternehmensangaben',
      name: 'Polina Ivanova (Einzelunternehmerin)',
      tradingAs: 'Handelnd als Qwantix Agency',
      address: '3F Commutation Plaza, London Road, Liverpool L3 8HR, Vereinigtes Königreich',
      taxId: 'Steuernummer (UTR): 5927656622',
    },
    contact: {
      title: 'Kontakt',
      email: 'E-Mail: info@qwantix.agency',
      phone: 'Telefon: +44 79 1832 9441',
    },
    responsible: {
      title: 'Verantwortlich für den Inhalt',
      text: 'Polina Ivanova, 3F Commutation Plaza, London Road, Liverpool L3 8HR, Vereinigtes Königreich',
    },
    dispute: {
      title: 'Streitbeilegung',
      text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    }
  },
  es: {
    title: 'Aviso Legal (Impressum)',
    subtitle: 'Información según requisitos legales',
    companyInfo: {
      title: 'Información de la Empresa',
      name: 'Polina Ivanova (Autónoma)',
      tradingAs: 'Operando como Qwantix Agency',
      address: '3F Commutation Plaza, London Road, Liverpool L3 8HR, Reino Unido',
      taxId: 'UTR: 5927656622',
    },
    contact: {
      title: 'Datos de Contacto',
      email: 'Email: info@qwantix.agency',
      phone: 'Teléfono: +44 79 1832 9441',
    },
    responsible: {
      title: 'Responsable del Contenido',
      text: 'Polina Ivanova, 3F Commutation Plaza, London Road, Liverpool L3 8HR, Reino Unido',
    },
    dispute: {
      title: 'Resolución de Disputas',
      text: 'La Comisión Europea facilita una plataforma de resolución de litigios en línea, la cual se encuentra disponible en el siguiente enlace: https://ec.europa.eu/consumers/odr. No estamos dispuestos ni obligados a participar en procedimientos de resolución de disputas ante una junta de arbitraje de consumo.',
    }
  },
  ru: {
    title: 'Правовая информация (Impressum)',
    subtitle: 'Информация в соответствии с законодательными требованиями',
    companyInfo: {
      title: 'Информация о компании',
      name: 'Polina Ivanova (Индивидуальный предприниматель)',
      tradingAs: 'Действует под брендом Qwantix Agency',
      address: '3F Commutation Plaza, London Road, Liverpool L3 8HR, United Kingdom',
      taxId: 'Налоговый номер (UTR): 5927656622',
    },
    contact: {
      title: 'Контактные данные',
      email: 'Email: info@qwantix.agency',
      phone: 'Телефон: +44 79 1832 9441',
    },
    responsible: {
      title: 'Ответственный за контент',
      text: 'Polina Ivanova, 3F Commutation Plaza, London Road, Liverpool L3 8HR, United Kingdom',
    },
    dispute: {
      title: 'Разрешение споров',
      text: 'Европейская комиссия предоставляет платформу для онлайн-разрешения споров (OS): https://ec.europa.eu/consumers/odr. Мы не желаем и не обязаны участвовать в процедурах по разрешению споров в органах потребительского арбитража.',
    }
  },
};

export default async function ImpressumPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
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
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2 border-b pb-2">
              <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
              {contentLang.companyInfo.title}
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-xl font-bold text-gray-900 mb-1">{contentLang.companyInfo.name}</p>
              <p className="text-gray-600 mb-4 italic">{contentLang.companyInfo.tradingAs}</p>
              
              <div className="flex items-start gap-3 mb-3">
                <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{contentLang.companyInfo.address}</p>
              </div>
              
              <p className="text-sm font-mono bg-white inline-block px-3 py-1 rounded border border-gray-200 mt-2">
                {contentLang.companyInfo.taxId}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2 border-b pb-2">
              <EnvelopeIcon className="w-6 h-6 text-indigo-600" />
              {contentLang.contact.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
                <a href="mailto:info@qwantix.agency" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  info@qwantix.agency
                </a>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <PhoneIcon className="w-5 h-5 text-indigo-600" />
                <a href="tel:+447918329441" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  +44 79 1832 9441
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2 border-b pb-2">
              <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
              {contentLang.responsible.title}
            </h2>
            <p className="text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">
              {contentLang.responsible.text}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-2">
              {contentLang.dispute.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {contentLang.dispute.text.split('https://').map((part, i) => {
                if (i === 0) return part;
                const url = 'https://' + part.split(' ')[0];
                const rest = part.slice(part.split(' ')[0].length);
                return (
                  <span key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">
                      {url}
                    </a>
                    {rest}
                  </span>
                );
              })}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

